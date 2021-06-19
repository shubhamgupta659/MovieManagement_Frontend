import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(items: any, idFilter: number, nameFilter: string, ratingFilter: string, languageFilter: string, yearFilter: string) {
    if (items && items.length) {
      return items.filter(item => {
        if ((idFilter && !item.movieId) || (idFilter && item.movieId.toString().indexOf(idFilter.toString()) === -1)) {
          return false;
        }
        if ((nameFilter && !item.movieName) || (nameFilter && item.movieName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((ratingFilter && !item.rating) || (ratingFilter && item.rating.toLowerCase().indexOf(ratingFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((languageFilter && !item.language) || (languageFilter && item.language.toLowerCase().indexOf(languageFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((yearFilter && !item.year) || (yearFilter && item.year.toString().indexOf(yearFilter.toString()) === -1)) {
          return false;
        }

        return true;
      })
    }
    else {
      return items;
    }

  }

  }
