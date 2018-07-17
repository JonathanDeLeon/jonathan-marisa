const loadingUtil = {
	_loader: null,
  registerLoader(loader) {
    this._loader = loader;
  },
  unregister() {
		if (this._loader) {
			this._loader.hide();
			this._loader = null;
		}
	},
	show(data) {
		if (this._loader) {
      this._loader.show(data);
    }
	},
	hide() {
    if (this._loader) {
      this._loader.hide();
    }
	}
};

export default loadingUtil;
