import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  selectedImageUrl: string | ArrayBuffer | null = null;
  selectedImageName: string | null = null;

  constructor() {}

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.selectedImageName = selectedFile.name;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.selectedImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }
}
