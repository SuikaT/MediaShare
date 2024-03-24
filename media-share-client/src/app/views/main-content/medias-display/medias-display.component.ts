import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../model/interfaces/Media';
import { CommonModule } from '@angular/common';
import { MediasService } from '../../../services/medias.service';
import { MediaTypeEnum } from '../../../model/enums/MediaTypeEnum';
import { StatesService } from '../../../services/states.service';
import { PersistenceService } from '../../../services/persistence.service';
import { MediaFile } from '../../../model/interfaces/MediaFile';

@Component({
  selector: 'app-medias-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medias-display.component.html',
  styleUrl: './medias-display.component.scss',
})
export class MediasDisplayComponent implements OnInit {
  @Input()
  mediaList: Media[] = [];

  constructor(private _persistence: PersistenceService) {}

  ngOnInit(): void {}

  downloadEp1(media: Media) {
    this._persistence.getEpisode(media.type, media.id, 0, 0).subscribe((response) => {
      const fileName = this.getFileNameFromResponse(response);

      const mediaFile: MediaFile = { file: response.body, fileName: fileName ? fileName : 'file.mkv' };

      this.downloadFile(mediaFile);
    });
  }

  private getFileNameFromResponse(response): string {
    const contentDisposition = response.headers.get('content-Disposition');
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="(.+)"/);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }

    return undefined;
  }

  downloadFile(mediaFile: MediaFile) {
    const type = this.getType(mediaFile.fileName);

    const blob = new Blob([mediaFile.file], { type: type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = mediaFile.fileName; // Set your desired file name
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getType(fileName: string) {
    const extension = fileName.slice(-4);
    if (extension == '.mp4') return 'video/mp4';

    //mkv as default
    return 'video/x-matroska';
  }
}
