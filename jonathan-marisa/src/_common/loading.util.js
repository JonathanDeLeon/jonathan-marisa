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
	show() {
	  if (!this._loader) {
			throw new Error('A loader is not registered!');
		}
		this._loader.show();
	},
	hide() {
		this._loader.hide();
	}
};

export default loadingUtil;
