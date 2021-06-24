import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(items: any, idFilter: number, nameFilter: string, descriptionFilter: string,genreFilter: string,directorFilter: string, languageFilter: string, yearFilter: string) {
    if (items && items.length) {
      return items.filter(item => {
        if ((idFilter && !item.movieId) || (idFilter && item.movieId.toString().indexOf(idFilter.toString()) === -1)) {
          return false;
        }
        if ((nameFilter && !item.movieName) || (nameFilter && item.movieName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((descriptionFilter && !item.description) || (descriptionFilter && item.description.toLowerCase().indexOf(descriptionFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((genreFilter && !item.genre) || (genreFilter && item.genre.toLowerCase().indexOf(genreFilter.toLowerCase()) === -1)) {
          return false;
        }
        if ((directorFilter && !item.director) || (directorFilter && item.director.toLowerCase().indexOf(directorFilter.toLowerCase()) === -1)) {
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
