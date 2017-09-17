const ls = window.localStorage;


class Storage {


  constructor() {
  }


  get (key, type) {
    if (!type) {
      type = 'array'
    }
    let value = ls.getItem(key);
    // console.log(value)
    return value === 'undefined' ? '' : JSON.parse(value)
  }

  set (option) {
    for (let key in option) {
      ls.setItem([key], JSON.stringify(option[key]))

    }
  };

  remove(key) {
    ls.removeItem(key)
  };

  clean() {
    ls.clear()
  }
}

export default Storage
