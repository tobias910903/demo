<template>
	<div>
		{{ msg }}
		<router-link :to="{name:'page1'}">页面一</router-link>
		<router-link :to="{name:'page2'}">页面二-从页面三带参数过来</router-link>
		<router-link :to="{name:'page3', params:{ id:'id3', name:'name3'}}">页面三有参数</router-link>
	</div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions, mapGetters} from 'vuex'
import {timeFun} from '@/utils/time' // 引入自定义的JS方法 
Vue.prototype.$time = timeFun


export default {
	data(){
		return {
			msg: '页面一'
		}
	},
	computed:{
		...mapState({
			count_rewrite: state => state.count
		})
	},
	mounted(){
		this.$time.bb(); // 自定义一个JS
		console.log(this.count_rewrite);
		console.log(this.$store.state.count);

		console.log(this);
		console.log(this.$route.params);
	}
}
</script>

<style scoped>

</style>
