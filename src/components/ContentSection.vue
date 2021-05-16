<template>
    <div>
        <ul v-if="isDataReceived && !showInsights">
            <li v-for="(list, index) in symbolList" :key="index" v-on:click="getStockDetails($event)">
        {{ list["1. symbol"] }}
      </li>
    </ul>

    <div class="callout" v-if="showInsights">
        <button class="callout_close" @click="showInsights=false"> X </button> <br>
        <br>
        <div>
            <p><strong>Simple Moving Average</strong></p>
            <p v-for="(avg, index) in smaResult" :key="index">{{ avg }}</p>
        </div>
        <div id="chartContainer" class="chart" style="min-height: 360px; width: 100%;"></div>
    </div>
  </div>
</template >

    <script>
        // import Highcharts from 'highcharts/highstock';

        export default {
            name: "ContentSection",
  props: {
            msg: String,
  },
  data() {
    return {
            keepFirst: false,
      openOnFocus: false,
      name: "",
      selected: null,
      clearable: false,
      symbol: "",
      symbolList: { },
      isDataReceived: false,
      stockDetails: {},
      showInsights: false,
      smaResult: [],
    };
  },
  created() {
            this.symbol = "ibm";
            this.getSymbolData(this.symbol);
            
  },
  computed: { },
  methods: {
        getSymbolData( symbolVal ) {
            let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ symbolVal }&apikey=MV745E3M4G9V1QD6`;
            this.$http.get(url).then((response) => {
                this.loading = false;
                this.symbolList = response.body.bestMatches;
                console.log('symbolList ', this.symbolList);
                return this.symbolList;
            });
        },

        getStockDetails(e) {
            console.log('details ', e.target.innerText);
            let symbolVal = e.target.innerText;
            let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ symbolVal }&interval=5min&apikey=MV745E3M4G9V1QD6`;
            this.$http.get(url).then((response) => {
                this.loading = false;
                this.stockDetails = response.body;
                this.showInsights = true;
                console.log('stockDetails ', this.stockDetails);
                const arrLen = Object.entries(this.stockDetails["Time Series (5min)"]);
                let array = [];
                for(let i = arrLen.length; i > arrLen.length-10; i--){
                    array.push(Number(arrLen[i-1][1]["4. close"]));
                    console.log({arrLen});
                }
                const SMA = this.getSma(5, 7, array);
                console.log('SMA: ', SMA);
                return this.stockDetails;
            });
        },
        
        getSma(before, after, array) {
            
            if (after == undefined) after = 0;
            const smaResult = [];
            for (let i = 0; i < array.length; i++) {
                const subArr = array.slice(Math.max(i - before, 0), Math.min(i + after + 1, array.length));
                const avg = subArr.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0) / subArr.length;
                smaResult.push(avg);
            }
            console.log({smaResult});
            this.smaResult = smaResult;
            return this.smaResult;
        },
    },
    mounted() {
        if(this.symbolList) {
            this.isDataReceived = true;
        }
        // this.loadChart();

        // **************************************

           /* Highcharts.getJSON('this.stockDetails["Time Series (5min)"]', function(data) {

                // split the data set into ohlc and volume
                var ohlc = [],
                    volume = [],
                    dataLength = data.length,
                    i = 0;

                for (i; i < dataLength; i += 1) {
                    ohlc.push([
                    data[i][0], // the date
                    data[i][1], // open
                    data[i][2], // high
                    data[i][3], // low
                    data[i][4] // close
                    ]);

                    volume.push([
                    data[i][0], // the date
                    data[i][5] // the volume
                    ]);
                }

                Highcharts.stockChart('chartContainer', {
                    yAxis: [{
                    labels: {
                        align: 'left'
                    },
                    height: '80%',
                    resize: {
                        enabled: true
                    }
                    }, {
                    labels: {
                        align: 'left'
                    },
                    top: '80%',
                    height: '20%',
                    offset: 0
                    }],
                    tooltip: {
                    shape: 'square',
                    headerShape: 'callout',
                    borderWidth: 0,
                    shadow: false,
                    positioner: function(width, height, point) {
                        var chart = this.chart,
                        position;

                        if (point.isHeader) {
                        position = {
                            x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                            ),
                            y: point.plotY
                        };
                        } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                        }

                        return position;
                    }
                    },
                    series: [{
                    type: 'ohlc',
                    id: 'aapl-ohlc',
                    name: 'AAPL Stock Price',
                    data: ohlc
                    }, {
                    type: 'column',
                    id: 'aapl-volume',
                    name: 'AAPL Volume',
                    data: volume,
                    yAxis: 1
                    }],
                    responsive: {
                    rules: [{
                        condition: {
                        maxWidth: 800
                        },
                        chartOptions: {
                        rangeSelector: {
                            inputEnabled: false
                        }
                        }
                    }]
                    }
                });
            }); 
            */
        // **************************************

    },
};
</script>;
<style scoped>
    li {
        cursor: pointer;
    }
    .callout {
        border: 0.2rem solid gray;
        position: relative;
    }
    .callout_close {
                
    }
</style>