import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  throwError,
  timer,
  of,
  map,
  switchMap,
  catchError,
  retry,
  filter,
  delay,
  repeat,
  takeWhile,
  tap,
} from 'rxjs';

// Interfaces for Azure Vision API responses
interface AzureReadOperationResult {
  status: 'notStarted' | 'running' | 'succeeded' | 'failed';
  analyzeResult?: {
    readResults: {
      lines: {
        text: string;
      }[];
    }[];
  };
}

export interface OcrResult {
  cardNumber: string | null;
  cardName: string | null; // We'll add logic for this later if needed
  fullText: string;
}

@Injectable({
  providedIn: 'root',
})
export class AzureVisionService {
  private http = inject(HttpClient);

  // Read environment variables safely
  private visionApiUrl = import.meta.env['NG_APP_AZURE_VISION_AI_REST_URL'];
  private visionApiKey = import.meta.env['NG_APP_AZURE_VISION_AI_KEY'];

  private readonly pollingIntervalMs = 1000; // Poll every 1 second
  private readonly maxAttempts = 8; // Allow more polling attempts

  analyzeImage(imageData: Blob): Observable<OcrResult> {
    if (!this.visionApiUrl || !this.visionApiKey) {
      console.error('Azure Vision API URL or Key is not configured.');
      return throwError(
        () => new Error('Azure Vision credentials not configured.')
      );
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': this.visionApiKey,
    });

    // --- Step 1: Submit image to Azure Vision API ---
    return this.http
      .post(this.visionApiUrl + '/vision/v3.1/read/analyze', imageData, {
        headers,
        observe: 'response',
      })
      .pipe(
        tap((res) => console.log('Azure Initial Response Status:', res.status)),
        // --- Step 2: Extract Operation-Location URL and Poll ---
        switchMap((response) => {
          const operationUrl = response.headers.get('Operation-Location');
          if (!operationUrl) {
            return throwError(
              () => new Error('Operation-Location header not found.')
            );
          }
          return this.pollForResult(operationUrl, this.visionApiKey ?? '');
        }),
        // --- Step 3: Parse the successful result ---
        map((result) => this.parseOcrResult(result)),
        catchError((error) => {
          console.error('Error during Azure Vision API call:', error);
          return throwError(() => new Error('Failed to analyze image.'));
        })
      );
  }

  private pollForResult(
    operationUrl: string,
    apiKey: string
  ): Observable<AzureReadOperationResult> {
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': apiKey,
    });

    return timer(0, this.pollingIntervalMs).pipe(
      // Start immediately, then poll
      switchMap(() =>
        this.http.get<AzureReadOperationResult>(operationUrl, { headers })
      ),
      takeWhile(
        (result, index) =>
          (result.status === 'running' || result.status === 'notStarted') &&
          index < this.maxAttempts,
        true // Include the last emission (succeeded/failed/timed out)
      ),
      // Filter out intermediate results, only emit final one
      filter(
        (result) => result.status === 'succeeded' || result.status === 'failed'
      ),
      // Throw error if failed or timed out (status still running)
      switchMap((result) => {
        if (result.status === 'failed') {
          return throwError(
            () => new Error('Azure Vision API processing failed.')
          );
        }
        if (result.status !== 'succeeded') {
          return throwError(
            () => new Error('Azure Vision API polling timed out.')
          );
        }
        return of(result); // Pass successful result through
      })
    );
  }

  private parseOcrResult(result: AzureReadOperationResult): OcrResult {
    const extractedLines: string[] =
      result.analyzeResult?.readResults.flatMap((page) =>
        page.lines.map((line) => line.text.trim())
      ) ?? [];

    const fullText = extractedLines.join('\n');

    let cardNumber: string | null = null;
    // Regex to find card number like "123/456" or "123 456"
    const cardNumberRegex = /(\d{2,3})\s?[\/\s]\s?(\d{2,3})/;

    cardNumber =
      fullText.match(cardNumberRegex)?.[1]?.trim().replace(/^0+/, '') ?? null;

    let cardName: string | null = null;
    let longestCandidate = '';

    // Check the first two lines for the longest text sequence likely to be the name
    const linesToCheck = Math.min(2, extractedLines.length);
    for (let i = 0; i < linesToCheck; i++) {
      const line = extractedLines[i];
      // Find sequences of letters, spaces, hyphens, and apostrophes
      const candidates = line.match(/[A-Za-z\s\-\']+/g);
      if (candidates) {
        candidates.forEach(candidate => {
          const trimmedCandidate = candidate.trim();
          // Basic filter: avoid short fragments, update if longer
          if (trimmedCandidate.length > longestCandidate.length && trimmedCandidate.length >= 3) {
            longestCandidate = trimmedCandidate;
          }
        });
      }
    }

    if (longestCandidate) {
      // Apply common corrections
      cardName = longestCandidate
        .replace(/\by\s+STAR\b/gi, 'VSTAR')   // y STAR -> VSTAR (case insensitive)
        .replace(/\bv\s+star\b/gi, 'VSTAR')   // v star -> VSTAR
        .replace(/\bv\s+max\b/gi, 'VMAX');    // v max -> VMAX
      // Add more replacements if needed

      // Remove potential leading/trailing non-alphanumeric if regex didn't catch all
      cardName = cardName.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '').trim();
    }

    // Fallback if no good candidate was found (optional)
    // if (!cardName && extractedLines.length > 1) { 
    //    cardName = extractedLines[1]; 
    // }

    return {
      cardNumber,
      cardName,
      fullText,
    };
  }
}
