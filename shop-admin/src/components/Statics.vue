<template>
    <div class="statics">
        <el-select v-model="year" placeholder="请选择年份" @change="yearOnChange">
            <el-option :key="2019" :label="2019" :value="2019"></el-option>
        </el-select>
        <div id="myChart" style="width:1000px;height:200px;margin:10px 20px"></div>
        <div id="myChart2" style="width:1000px;height:300px;margin:10px 20px"></div>
    </div>
</template>

<script>
    import {staticMonth, staticAmount} from '@/api';

    export default {
        name: "Statics",

        data() {
            return {
                year: 2019,
                months: [],
                sell: {
                    total: 0,
                    pie: [],
                },
            };
        },

        methods : {
            getStaticMonth() {
                staticMonth(this.year).then(res => {
                    this.months = res.data;

                    let myChart = echarts.init(document.getElementById("myChart2"));
                    myChart.clear();
                    myChart.setOption({
                        title : {
                            text: '年度销售额统计图',
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['销售额'],
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [{
                                type : 'category',
                                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            }],
                        yAxis : [{
                                type : 'value'
                            }],
                        series : [{
                            name:'销售额',
                            type:'bar',
                            data: this.months,
                        },]
                    });
                });
            },

            getStaticAmount() {
                staticAmount().then(res => {
                    this.sell = res.data;
                    let myChart = echarts.init(document.getElementById("myChart"));
                    myChart.clear();
                    myChart.setOption({
                        title : {
                            text: '年度图书销量图',
                            x:'left'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '50%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [{
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.sell.pie,
                        }]
                    });
                });
            },

            yearOnChange() {
                this.getStaticMonth();
            },
        },

        mounted: function () {
            this.getStaticMonth();
            this.getStaticAmount();
        },
    }
</script>

<style scoped>

</style>