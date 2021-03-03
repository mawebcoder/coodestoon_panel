<template>
    <div>
        <div id="header_section">
            <header-layout></header-layout>
        </div>
        <section class="row" id="main_section">
            <div class="col-2" id="sideBar_section">
                <side-bar></side-bar>
            </div>
            <div class="col-10" id="content_section">
                <div class="page_head">{{$store.state.pageTitle}}</div>
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import HeaderLayout from "@/layouts/Header";
    import SideBar from "@/layouts/Sidebar";

    export default {
        name: "Panel",
        components:{
            HeaderLayout,
            SideBar
        }
    }
</script>

<style scoped>

</style>