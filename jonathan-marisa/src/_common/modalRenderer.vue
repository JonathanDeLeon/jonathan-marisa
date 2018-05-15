<template>
	<component :is="internalComponent" :initial-data="modalData" :dialog="dialog" @close="closeEvent($event)"></component>
</template>

<script>

import modalUtil from './modal.util';

export default {
	data() {
		return {
			internalComponent: '',
			modalData: null,
      dialog: false,
		}
	},
	created() {
		modalUtil.registerRenderer(this);
	},
	methods: {
		closeEvent(event) {
			modalUtil.hideModal(event);
		},
		close() {
			this.internalComponent = '';
      this.dialog = false;
			// $(this.$el).remove();
		},
		show(componentName, data) {
			this.internalComponent = componentName;
			this.modalData = data;
			this.dialog = true;
		},
		refresh() {
			// $(this.$el).modal('refresh');
		}
	},
	beforeDestroy() {
		modalUtil.unregister();
	}
};
</script>

<style>

</style>


