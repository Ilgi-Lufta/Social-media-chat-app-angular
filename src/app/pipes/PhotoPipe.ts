
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class PhotoPipe implements PipeTransform{
    transform(imgpath?: string) : string {
        return "http://localhost:5223/Images/"+imgpath;
    }
}