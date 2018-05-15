function Deferred(){
  this._done = [];
  this._fail = [];
}
Deferred.prototype = {
  execute: function(list, args){
    var i = list.length;

    // convert arguments to an array
    // so they can be sent to the
    // callbacks via the apply method
    args = Array.prototype.slice.call(args);

    while(i--) list[i].apply(null, args);
  },
  resolve: function(){
    this.execute(this._done, arguments);
  },
  reject: function(){
    this.execute(this._fail, arguments);
  },
  then: function(callback){
    this._done.push(callback);
  },
  done: function(callback){
    this._done.push(callback);
  },
  fail: function(callback){
    this._fail.push(callback);
  }
}

const modalUtil = {
	_modalRenderer: null,
	_modalPromise: null,
	_modalReturnData: null,
	registerRenderer(renderer) {
		// can't use this yet because we don't 'destroy' components within their lifecycle
		// if (this._modalRenderer) {
		// 	throw new Error('Only one renderer should be used per Vue app.');
		// }
		this._modalRenderer = renderer;
	},
	unregister() {
		if (this._modalRenderer) {
			this._modalRenderer.close();
			this._modalRenderer = null;
		}
	},

	showModal(componentName, data) {
		if (this._modalPromise) {
			throw new Error('A modal is already open! Only one modal is supported at a time.');
		}
		if (!this._modalRenderer) {
			throw new Error('A modal renderer is not registered!');
		}
		this._modalPromise = new Deferred();
		this._modalRenderer.show(componentName, data)

		return this._modalPromise;
	},
	hideModal(data) {
		if (!data && this._modalReturnData) {
			data = this._modalReturnData;
		}
		this._modalReturnData = null;
		if (this._modalRenderer) {
			this._modalRenderer.close();
		}
		if (this._modalPromise) {
			this._modalPromise.resolve(data);
		}
		this._modalPromise = null;
	},
	refreshModal() {
		this._modalRenderer.refresh();
	},
	setReturnData(data) {
		this._modalReturnData = data;
	},
	confirm(message, title) {
		return this.showModal('confirm-modal', { message, title });
	}
};

export default modalUtil;
