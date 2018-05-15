const loadingUtil = {
	_loader: $('<div class="ui active dimmer"><div class="ui text loader">Loading</div></div>'),
	show() {
		$('body').append(this._loader);
	},
	hide() {
		this._loader.remove();
	}
};

export default loadingUtil;