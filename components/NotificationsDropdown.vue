<template>
    <div class="notifications-dropdown">
        <div class="modal-header">
            <h2>Obavijesti</h2>
            <i class="material-icons cursor-pointer" @click="$emit('close-notifications')">close</i>
        </div>
        <div class="flex flex-col justify-between">
            <div v-if="notifications.length">
                <div v-for="notification in notifications" :key="notification.id"
                     class="notification hover:shadow-md">
                    <div class="flex items-center justify-between">
                        <div class="text-base font-medium truncate text-black" v-if="notification.user">
                            {{ notification.user.name }}
                        </div>
                        <div class="text-gray-400 text-sm mt-1">{{
                                $moment(notification.date).format("DD.MM.YYYY")
                            }}
                        </div>
                    </div>
                    <div class="text-gray-600 text-sm font-normal mt-1"> {{
                            notification.text
                        }}
                    </div>
                    <div class="font-medium flex mt-3" @click="$emit('clicked')">
                        <nuxt-link :to="{ path: '/' + notification.action }" class="flex justify-between space-x-3">
                            <button type="button" class="btn btn-primary py-1 px-2 text-white hover:text-white">
                                Pogledaj
                            </button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col items-center no-notifications">
                <img src="/notifications.svg" alt="">
                <h2 class="mt-2 p-2 text-standard text-gray-800 font-medium">Nemate obavijesti</h2>
            </div>
            <ActionButton v-if="notifications.length"
                          :style-options="{ marginBottom: '24px', width: '100%', minHeight: '48px' }"
                          @action="$emit('clear-notifications')" placeholder="Očisti obavijesti"
                          icon="trash-alt"></ActionButton>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";
import ActionButton from "./actionButtons/ActionButton";

@Component({
    components: {ActionButton}
})

export default class NotificationsDropdown extends Vue {
    @Prop({
        type: Array,
        required: true
    }) notifications;

}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.notifications-dropdown {
    height: fit-content;
    max-height: 600px;
    overflow: scroll;
    overflow-y: scroll;
    background: #fff;

    @include for-phone-only {
        height: calc(100vh - 100px);
        padding: 0 24px;
    }

}

.no-notifications {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 60px 0;


    img {
        height: 80px !important;
        min-width: fit-content !important;
    }

    @include for-phone-only {
        img {
            height: 90px;
        }
    }
}

ul, .no-notifications {
    height: auto;
}

.btn-primary {
    font-size: 13px;
}

.notification {
    padding: 0;
    margin-bottom: 12px;
    border-bottom: 1px solid #f1f1f1;
    transition: 0.3s all ease;
    padding-bottom: 12px;

    &:hover {
        cursor: pointer;
    }

    @include for-phone-only {
        padding: 0;
        padding-bottom: 24px
    }

    a {
        button {
            color: #000 !important;
        }
    }
}

.no-notifications {
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 18px;
    }
}
</style>
