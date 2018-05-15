const sortUtil = {
  sort(items, sortPropery, isDesc) {
    // let sort = this.form.controls['sort'].value;
    // let desc = this.form.controls['sortDesc'].value;
    let dir = 1;
    if (isDesc) {
      dir = -1;
    }
    // console.log('sort', sort, dir);
    if (sortPropery) {
      const sorts = sortPropery.split('.');
      return items.sort((a, b) => {
        return this._sortCompare(a, b, sorts, 0, dir);
      });
    }
    else {
      return items;
    }
  },

  _sortCompare(a, b, sorts, sortsIndex, dir) {
    const sort = sorts[sortsIndex];
    // console.log('sort values', sort, a, b)
    if (sort in a && sort in b) {
      if (sorts.length > sortsIndex + 1) {
        if (Array.isArray(a[sort])) {
          return this._sortCompare(a[sort][0], b[sort][0], sorts, sortsIndex + 1, dir);
        }
        else {
          return this._sortCompare(a[sort], b[sort], sorts, sortsIndex + 1, dir);
        }
      }
      if (a[sort] < b[sort]) {
        return -1 * dir;
      }
      else if (a[sort] > b[sort]) {
        return 1 * dir;
      }
      else {
        return 0;
      }
    }
    else if (sort in a) {
      return -1 * dir;
    }
    else if (sort in b) {
      return 1 * dir;
    }
    else {
      return 0;
    }
  }
}

export default sortUtil;
