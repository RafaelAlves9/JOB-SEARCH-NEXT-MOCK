export async function mockMediaRecorder(page: any) {
   await page.addInitScript(() => {
      class MockMediaRecorder {
         public ondataavailable: ((event: { data: Blob }) => void) | null = null;
         public onstop: (() => void) | null = null;
         public stream: MediaStream;

         constructor(stream: MediaStream) {
            this.stream = stream;
         }

         start() {
            setTimeout(() => {
               this.ondataavailable?.({ data: new Blob(["fake audio"], { type: "audio/webm" }) });
               setTimeout(() => this.onstop?.(), 0);
            }, 10);
         }

         stop() {
            this.onstop?.();
         }
      }

      class MockMediaStreamTrack {
         stop() {}
      }

      class MockMediaStream {
         getTracks() {
            return [new MockMediaStreamTrack()];
         }
      }

      Object.defineProperty(window, "MediaRecorder", {
         writable: true,
         value: MockMediaRecorder,
      });

      Object.defineProperty(navigator, "mediaDevices", {
         writable: true,
         value: {
            getUserMedia: async () => new MockMediaStream(),
         },
      });
   });
}
