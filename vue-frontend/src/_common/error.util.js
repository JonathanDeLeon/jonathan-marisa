const errorUtil = {
	showToast(err, defaultMessage) {
		var message = (err && err.responseJSON && err.responseJSON.message) || defaultMessage;
		Messenger().post({ message, type: 'error', showCloseButton: true, hideAfter: 2.5 });
	}
};

export default errorUtil;