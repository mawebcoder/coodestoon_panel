<template>
    <div>
        <transition name="modal_transition" mode="out-in">
            <div v-if="$store.state.modal_show" class="edit_tag_modal">
                <i @click="$store.state.modal_show=false" class="close_modal">&times;</i>
                <div class="modal">
                    <div class="header">
                        {{title}}
                    </div>
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "modal",
        props: ['title']
    }
</script>

<style scoped lang="scss">
    @import "./src/assets/globalStyles/classes";

    .edit_tag_modal {
        @extend .blur;
        transition: .5s;
        position: fixed;
        padding: 10px;
        width: 100vw;
        height: 100vh;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        z-index: 99;

        .modal {
            margin: 40px auto;
            width: 45%;
            min-height: 100px;
            background-color: rgba(54, 53, 51, 1);
            border-radius: 4px;
            box-shadow: 0 0 3px rgba(54, 53, 51, 0.84);
            padding: 10px;

            .header {
                height: 50px;
                background-color: #fff;
                border-radius: 5px;
                width: 100%;
                color: rgba(32, 31, 3, 0.95);
                font-weight: bold;
                text-align: center;
                line-height: 48px;
            }
        }
    }

    .close_modal {
        display: block;
        height: 40px;
        width: 40px;
        color: #fff;
        border-radius: 100%;
        position: absolute;
        left: 10px;
        top: 10px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        font-size: 2em;
        line-height: 40px;
        transition: .3s;
        &:hover{
            transform: scale(1.09);
        }
    }

    .modal_transition-enter {
        opacity: 0;
    }

    .modal_transition-leave-active {
        opacity: 0;
    }
</style>