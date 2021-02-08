<template>
    <div>
        <router-link :to="{name:link}">
            <div style="height: 50px;padding: 0 20px" dir="ltr">
            <span :style="{'backgroundColor':color}" class="button">
                <small>{{text}}</small>
            <box-icon type="solid" :name='icon'></box-icon>
        </span>
            </div>
        </router-link>


    </div>
</template>

<script>

    export default {
        props: {
            color: {
                default: "#36A6B8"
            },
            text:{
                default:'بازگشت'
            },
            icon: {
                default: 'trash'
            },
            link:{
                default:'/'
            }
        },
        name: "Button"
    }
</script>

<style scoped lang="scss">
    .button {
        display: block;
        height: 45px;
        width: 145px;
        border-radius: 4px;
        line-height: 58px;
        position: relative;
        cursor: pointer;
        transition: .2s;

        &:hover{
            transform: scale(1.02);
        }
        small{
            position: absolute;
            right: 13px;
            font-size: 1em;
            bottom: -5px;
        }
    }
</style>