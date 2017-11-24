<template>
    <ai-col class="scroll">
        <ai-col class="box margin padding dark">
            <ai-paragraph>
                <h5>Danh sách các Project của nhóm</h5>
                <ai-space/>
                <ai-border size="40">
                    <ai-row>
                        <ai-button path="drive.loadClientSecret"
                                   icon="">
                            <span class="slot"
                                  style="padding-left: 0">
                                Nạp mã <br/> bí mật
                            </span>
                        </ai-button>
                        <ai-line/>
                        <ai-col>
                            <ai-button text="Định danh"
                                       icon="" />
                            <ai-line/>
                            <ai-button text="Bí mật"
                                       icon="" />
                        </ai-col>
                        <ai-line/>
                        <ai-col class="full">
                            <ai-label text="{$google.client_secret.client_id}"
                                      class="hover light" />
                            <ai-line/>
                            <ai-label text="{$google.client_secret.client_secret}"
                                      class="hover light" />
                        </ai-col>
                        <ai-line/>
                        <ai-button icon="">
                            <span class="slot"
                                  style="padding-left: 0">
                                Đăng nhập <br/> với Google 
                            </span>
                        </ai-button>
                    </ai-row>
                    <ai-line/>
                    <ai-row>
                        <ai-button text="Mã khởi tạo mã truy cập"
                                   icon="" />
                        <ai-input path="$google.auth.refresh_token"
                                  class="full" />
                        <ai-button text="Khởi tạo mã truy cập mới"
                                   icon="" />
                    </ai-row>
                    <ai-line/>
                    <ai-row>
                        <ai-button text="Mã truy cập"
                                   icon="" />
                        <ai-input path="$google.auth.access_token"
                                  class="full" />
                        <!-- <ai-button text="{picasa.accessTokenExpiresString}"
                                        icon="" /> -->
                    </ai-row>
                </ai-border>
            </ai-paragraph>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    include,
    computed
} from 'modules';

import moment from 'moment';
moment.locale('vi');

export default {
    name: 'drive',
    components: {
        ...load('container'),
        ...load('units')
    },
    computed: {
        ...computed('picasa')
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    mounted() {
        // setInterval(() => {
        //     const time = moment(this.accessTokenExpires).format('X') - moment().format('X');
        //     this.accessTokenExpiresString = time > 0 ?  `Còn ${time} giây` : 'Hết hạn';
        // }, 1000);
    }
};
</script>