<template>
    <ai-col class="scroll">
        <ai-col class="box margin padding dark">
            <ai-paragraph>
                <h5>Danh sách các Project của nhóm</h5>
                <ai-space/>
                <ai-border size="40">
                    <ai-col>
                        <ai-row>
                            <ai-button icon=""
                                       text="Định danh ứng dụng" />
                            <ai-input path="picasa.clientId"
                                      class="full"
                                      placeholder="picasa.clientId" />
                        </ai-row>
                    </ai-col>
                    <ai-line/>
                    <ai-col>
                        <ai-row>
                            <ai-button icon=""
                                       text="Mã bí mật" />
                            <ai-input path="picasa.clientSecret"
                                      class="full"
                                      placeholder="picasa.clientSecret" />
                        </ai-row>
                    </ai-col>
                    <ai-line/>
                    <ai-col>
                        <ai-row>
                            <ai-button icon=""
                                       text="Mã khởi tạo sau khi đăng nhập" />
                            <ai-input path="picasa.code"
                                      class="full"
                                      placeholder="picasa.code" />
                            <ai-button text="Lấy Code"
                                       path="#picasa.getCodeAndToken"
                                       icon="" />
                        </ai-row>
                    </ai-col>
                    <ai-line/>
                    <ai-col>
                        <ai-row>
                            <ai-button text="Mã khởi tạo mã truy cập"
                                       icon="" />
                            <ai-input path="picasa.refreshToken"
                                      class="full"
                                      placeholder="picasa.refreshToken" />
                            <ai-button text="Khởi tạo mã truy cập mới"
                                       path="#picasa.renewAccessToken"
                                       value="{picasa.refreshToken}"
                                       icon="" />
                        </ai-row>
                    </ai-col>
                    <ai-line/>
                    <ai-col>
                        <ai-row>
                            <ai-button text="Mã truy cập"
                                       icon="" />
                            <ai-input path="picasa.accessToken"
                                      class="full"
                                      placeholder="picasa.accessToken" />
                            <ai-button path="#picasa.getaccessTokenExpires"
                                       value="{picasa.accessToken}"
                                       text="{picasa.accessTokenExpiresString}"
                                       icon="" />
                        </ai-row>
                    </ai-col>
                </ai-border>
            </ai-paragraph>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    computed
} from 'modules';

import moment from 'moment';
moment.locale('vi');

export default {
    name: 'picasa',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            accessTokenExpiresString: 0
        };
    },
    computed: {
        ...computed('picasa')
    },
    mounted() {
        setInterval(() => {
            const time = moment(this.accessTokenExpires).format('X') - moment().format('X');
            this.accessTokenExpiresString = time > 0 ?  `Còn ${time} giây` : 'Hết hạn';
        }, 1000);
    }
};
</script>