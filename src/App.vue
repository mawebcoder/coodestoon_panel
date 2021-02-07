<template>
    <div id="app">
        <main>
            <div v-if="$store.state.loading" id="app_preloading">
                <div style="background-color:#fff;width: 100%;height: 100%;opacity: .7;position: absolute;top: 0;right: 0"></div>
                <div  class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
            <!--            header section-->
            <div id="header_section">
                <header-layout></header-layout>
            </div>
            <!--            end header section-->


            <!--            content section-->
            <section class="row" id="main_section">
                <div class="col-2" id="sideBar_section">
                    <side-bar></side-bar>
                </div>
                <div class="col-10" id="content_section">
                    <div class="page_head">{{$store.state.pageTitle}}</div>
                    <router-view></router-view>
                </div>
            </section>
            <!--            end content section-->

        </main>
    </div>
</template>

<script>
    import HeaderLayout from "./layouts/Header";
    import SideBar from "./layouts/Sidebar";
    export default {
        name: 'App',
        components: {
            HeaderLayout,
            SideBar
        }
    }
</script>

<style lang="scss">
    @import '~pretty-checkbox/src/pretty-checkbox.scss';
    @import '~vue-input-ui/dist/vue-input-ui.css';
    @import "./assets/globalStyles/app.scss";
    @import '~vuejs-noty-2/dist/vuejs-noty.css';
    .vs-pagination--mb{
        display: flex;
        justify-content: center !important;
    }
    textarea{
        resize: none !important;
        display: block;
    }
    label.vs-select--label{
        margin-bottom: 10px;
    }
    i.vs-icon{
        display: none !important;
    }
    * {
        font-family: IRANSans;
    }
    .vs-pagination--buttons{
        display: none !important;
    }
    #app_preloading{
        position: fixed;
        height: 100vh;
        width: 100vw;
        top: 0;
        right: 0;
        left: 0;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    .noty_body{
        direction: rtl !important;
    }
    main {
        max-width: 1460px;
        min-height: 100px;
        margin: 0 auto;
        direction: rtl;
    }

    #header_section {
        min-height: 100px;
    }

    #main_section {
        min-height: 100px;
    }

    #content_section {
        padding: 10px;
    }

    .pretty.p-switch .state:before {
        top: calc((0% - (100% - 1em)) - 23%);
    }

    #VueInputUi {
        padding: {
            right: 10px !important;
            bottom: 0;
            top: 0;
        }
    }
    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-ellipsis div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #0ea960;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(24px, 0);
        }
    }

</style>
