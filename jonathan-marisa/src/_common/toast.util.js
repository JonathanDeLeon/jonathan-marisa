const toastUtil = {
	showError(err, defaultMessage) {
		var message = (err && err.responseJSON && (err.responseJSON.message || err.responseJSON.error_description)) || defaultMessage;
		Messenger().post({ message, type: 'error', showCloseButton: true, hideAfter: 2.5 });
	},
	showMessage(message) {
		Messenger().post({ message, type: 'success', showCloseButton: true, hideAfter: 2.5 });
	}
};

export default toastUtil;