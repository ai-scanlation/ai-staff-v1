<template>
    <ai-col class="scroll">
        <ai-col class="box margin padding dark"
                size="30">
            <ai-paragraph>
                <h6>ImageMagick</h6>
                <p>- Chú thích: ImageMagick là phần mềm miễn phí được ứng dụng sử dụng để đọc thông tin của các tập tin ảnh (.psd/.png/.jpg/...), nếu thiếu ứng dụng này thì một số chức năng sẽ không thể hoạt động.</p>
                <p>- Nếu bạn máy tính bạn chưa có ImageMagick vui lòng tải về tại địa chỉ:</p>
                <ai-url href="http://imagemagick.org/script/download.php">http://imagemagick.org/script/download.php</ai-url>
                <p>- Ở đây tôi khuyến khích bạn sử dụng bản portable.</p>
                <ai-border>
                    <ai-col>
                        <ai-row>
                            <ai-button text="Thư mục cài đặt"
                                       path="#.selectFolder"
                                       value="setting.imagemagick"
                                       icon="" />
                            <ai-input path="setting.imagemagick"
                                      class="full"
                                      placeholder="Đường dẫn đến thư mục" />
                        </ai-row>
                        <ai-line/>
                        <ai-row>
                            <ai-button text="Thư mục tạm"
                                       path="#.selectFolder"
                                       value="setting.imagemagickTemporaryFolder"
                                       icon="" />
                            <ai-input path="setting.imagemagickTemporaryFolder"
                                      class="full"
                                      placeholder="Đường dẫn đến thư mục" />
                        </ai-row>
                        <ai-line/>
                        <ai-row>
                            <ai-button text="Số luồng"
                                       icon="" />
                            <ai-input type="number"
                                      path="setting.imagemagickConcurrency"
                                      class="full"
                                      placeholder="Số luồng" />
                        </ai-row>
                    </ai-col>
                </ai-border>
            </ai-paragraph>
            <ai-paragraph>
                <h6>Duyệt tập tin</h6>
                <ai-border>
                    <ai-col>
                        <ai-row>
                            <ai-button path="#.selectFolder"
                                       value="explorer.defaultFolder_1"
                                       text="Lối tắt thư mục 1"
                                       icon="" />
                            <ai-input path="explorer.defaultFolder_1"
                                      class="full"
                                      placeholder="Đường dẫn đến thư mục 1" />
                        </ai-row>
                        <ai-line/>
                        <ai-row>
                            <ai-button path="#.selectFolder"
                                       value="explorer.defaultFolder_2"
                                       text="Lối tắt thư mục 2"
                                       icon="" />
                            <ai-input path="explorer.defaultFolder_2"
                                      class="full"
                                      placeholder="Đường dẫn đến thư mục 2" />
                        </ai-row>
                        <ai-line/>
                        <ai-row>
                            <ai-button path="#.selectFolder"
                                       value="explorer.defaultFolder_3"
                                       text="Lối tắt thư mục 3"
                                       icon="" />
                            <ai-input path="explorer.defaultFolder_3"
                                      class="full"
                                      placeholder="Đường dẫn đến thư mục 3" />
                        </ai-row>
                    </ai-col>
                </ai-border>
                <p>- Chế độ: Đổi tên</p>
                <ai-border>
                    <ai-row>
                        <ai-input class="full"
                                  ref="phamhongphuc"
                                  type="textarea" />
                    </ai-row>
                </ai-border>
            </ai-paragraph>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    save
} from 'modules';

export default {
    name: 'blank',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {

        };
    },
    mounted() {
        save(this, []);
    }
};

</script>
