<template>
	<div>
		{{ msg }}
		<router-link :to="{name:'page1'}">页面一</router-link>
		<router-link :to="{name:'page2'}">页面二-从页面三带参数过来</router-link>
		<router-link :to="{name:'page3', params:{ id:'id3', name:'name3'}}">页面三有参数</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: '页面三'
		}
	},
	mounted: function(){
		console.log(this.$route.params);
	}
}
</script>

<style scoped>

</style>
