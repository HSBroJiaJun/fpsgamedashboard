// 初始化三個圖表
var rankChart = echarts.init(document.getElementById('rankChart'));
var playerChart = echarts.init(document.getElementById('playerChart'));
var trendChart = echarts.init(document.getElementById('trendChart'));

// 遊戲數據 (這裡是示例數據，你可以替換成自己的數據)
var gameData = {
    valorant: {
        name: "Valorant",
        ranks: {
            categories: ['Iron 1', 'Iron 2', 'Iron 3', 'Bronze 1', 'Bronze 2', 'Bronze 3', 'Silver 1', 'Silver 2', 'Silver 3', 'Gold 1', 'Gold 2', 'Gold 3', 'Platinum 1', 'Platinum 2', 'Platinum 3', 'Diamond 1', 'Diamond 2', 'Diamond 3', 'Ascendant 1', 'Ascendant 2', 'Ascendant 3','Immortal 1', 'Immortal 2', 'Immortal 3', 'Radiant'],
            values: [38871, 76780, 103574, 184957, 182911, 141694, 227551, 191418, 158166, 239058, 182945, 135039, 177595, 119365, 82269, 107839, 74118, 48783, 63028, 38705, 23146, 25542, 5010, 1400, 400]
        },
        currentPlayers: 18372900,
        maxPlayers: 20000000,
        yearlyTrend: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            players: [18318806, 18029094, 19584691, 19464141, 19131711, 20934126, 22036596, 24165246, 21375477, 19803596, 18605607, 18897103]
        }
    },
    cs2: {
    name: "Counter-Strike 2",
    ranks: {
        categories: ["≤4999", "5000-9999", "10000-14999", "15000-19999", "20000-24999", "25000-29999", "30000+"],
        values: [141000, 347000, 357000, 143000, 14000, 7200, 1000]
    },

    currentPlayers: 998982,
    maxPlayers: 20000000,

    yearlyTrend: {
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
        players: [912995, 1001964, 1042902, 1046846, 1040509, 1011732, 917889, 931818, 933243, 952166],
        peaks: [1784691, 1784691, 1824989, 1817879, 1720887, 1727814, 1422522, 1505419, 1571060, 1595852]
    }
    },
    apex: {
        name: "ApexLegends",
        ranks: {
            categories: ['Rookie IV', 'Rookie III', 'Rookie II', 'Rookie I', 'Bronze IV', 'Bronze III', 'Bronze II', 'Bronze I', 'Silver IV', 'Silver III', 'Silver II', 'Silver I', 'Gold IV', 'Gold III', 'Gold II', 'Gold I', 'Platinum IV', 'Platinum III', 'Platinum II', 'Platinum I', 'Diamond IV', 'Diamond III',  'Diamond II', 'Diamond I', 'Master',  'Apex Predator'],
            values: [17408, 3465, 3009, 2643, 32450, 9945, 7271, 5879, 14096, 12022, 9400, 7888, 17842, 16663, 13453, 11784, 19639, 23730, 20035, 18988, 38065, 54716, 26281, 15190, 21406, 2469]
        },
        currentPlayers: 61273, 
        maxPlayers: 20000000,
        yearlyTrend: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            players: [344621, 469431, 463933, 430800, 425742, 326928, 265369, 314327, 249334, 184035, 225795, 174720] 
        }
    },
    overwatch2: {
        name: "Overwatch2",
        ranks: {
            categories: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
            values: [1460, 7663, 19280, 21226, 9061, 1946, 500]
        },
        currentPlayers: 31747, 
        maxPlayers: 20000000,
        yearlyTrend: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            players: [35307, 41298, 45666, 60819, 51505, 50230, 51648, 58937, 59499, 58217, 56607, 48626] 
        }
    },
    fortnite: {
        name: "Fortnite",
        ranks: {
            categories: ['Bronze 1', 'Bronze 2', 'Bronze 3', 'Silver 1', 'Silver 2', 'Silver 3','Gold 1', 'Gold 2', 'Gold 3','Platinum 1', 'Platinum 2', 'Platinum 3', 'Diamond 1', 'Diamond 2',  'Diamond 3',  'Elite',  'Champion',  'Unreal'],
            values: [347740, 471356, 482841, 477680, 425058, 354869, 342746, 262533, 193133, 209497, 152992, 113146, 128716, 92063, 65411, 87381, 128955, 151476]
        },
        currentPlayers: 1312117, 
        maxPlayers: 20000000,
        yearlyTrend: {
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            players: [2167950, 2193000, 2235000, 2114000, 1994711, 1312117, 1442000, 1312117, 1200000, 1220000, 1200000, 1150000] 
        }
    }
};

// 創建排位分布柱狀圖
function createRankChart(data) {
    // 根據遊戲名稱定義不同的顏色配置
    function getRankColor(gameName, rankName) {
        // Valorant 專用顏色
        if (gameName === 'Valorant') {
            var valorantColors = {
                'Iron 1': '#4A4A4A',
                'Iron 2': '#4A4A4A', 
                'Iron 3': '#4A4A4A',
                'Bronze 1': '#CD7F32',
                'Bronze 2': '#CD7F32', 
                'Bronze 3': '#CD7F32',
                'Silver 1': '#C0C0C0', 
                'Silver 2': '#C0C0C0', 
                'Silver 3': '#C0C0C0',
                'Gold 1': '#ffc852ff', 
                'Gold 2': '#ffc852ff', 
                'Gold 3': '#ffc852ff',
                'Platinum 1': '#00ced1cb', 
                'Platinum 2': '#00ced1cb', 
                'Platinum 3': '#00ced1cb',
                'Diamond 1': '#9370DB', 
                'Diamond 2': '#9370DB', 
                'Diamond 3': '#9370DB',
                'Ascendant 1': '#007940ff', 
                'Ascendant 2': '#007940ff', 
                'Ascendant 3': '#007940ff',
                'Immortal 1': '#ac243aff', 
                'Immortal 2': '#ac243aff', 
                'Immortal 3': '#ac243aff',
                'Radiant': '#ffa600ff'
            };
            return valorantColors[rankName] || '#4CAF50';
        }
        
        // CS:GO 專用顏色
        if (gameName === 'Counter-Strike 2') {
            var csgoColors = {
                '≤4999': '#4A4A4A',
                '5000-9999': '#ffc852ff',
                '10000-14999': '#FF6347',
                '15000-19999': '#9370DB',
                '20000-24999': '#8A2BE2',
                '25000-29999': '#FF1493',
                '30000+': '#FF0000'
            };
            return csgoColors[rankName] || '#4CAF50';
        }
        
        // Apex Legends 專用顏色
        if (gameName === 'ApexLegends') {
            var apexColors = {
                'Rookie IV': '#8B4513', 
                'Rookie III': '#8B4513', 
                'Rookie II': '#8B4513', 
                'Rookie I': '#8B4513',
                'Bronze IV': '#CD7F32', 
                'Bronze III': '#CD7F32', 
                'Bronze II': '#CD7F32',
                'Bronze I': '#CD7F32',
                'Silver IV': '#C0C0C0', 
                'Silver III': '#C0C0C0', 
                'Silver II': '#C0C0C0', 
                'Silver I': '#C0C0C0',
                'Gold IV': '#FFD700', 
                'Gold III': '#FFD700', 
                'Gold II': '#FFD700', 
                'Gold I': '#FFD700',
                'Platinum IV': '#00CED1', 
                'Platinum III': '#00CED1', 
                'Platinum II': '#00CED1', 
                'Platinum I': '#00CED1',
                'Diamond IV': '#0083fdff', 
                'Diamond III': '#0083fdff', 
                'Diamond II': '#0083fdff', 
                'Diamond I': '#0083fdff', 
                'Master': '#895de2ff',
                'Apex Predator': '#FF0000'
            };
            return apexColors[rankName] || '#4CAF50';
        }
        
        // Overwatch 2 專用顏色
        if (gameName === 'Overwatch2') {
            var owColors = {
                'Bronze': '#CD7F32',
                'Silver': '#999999ff', 
                'Gold': '#FFD700',
                'Platinum': '#d4d4d4ff', 
                'Diamond': '#9cb8f5ff',
                'Master': '#ffa600ff',
                'Grandmaster': '#FF0000'
            };
            return owColors[rankName] || '#4CAF50';
        }
        
        // Fortnite 專用顏色
        if (gameName === 'Fortnite') {
            var fortniteColors = {
                'Bronze 1': '#CD7F32', 
                'Bronze 2': '#CD7F32', 
                'Bronze 3': '#CD7F32',
                'Silver 1': '#C0C0C0', 
                'Silver 2': '#C0C0C0', 
                'Silver 3': '#C0C0C0',
                'Gold 1': '#FFD700', 
                'Gold 2': '#FFD700', 
                'Gold 3': '#FFD700',
                'Platinum 1': '#00CED1', 
                'Platinum 2': '#00CED1', 
                'Platinum 3': '#00CED1',
                'Diamond 1': '#B9F2FF', 
                'Diamond 2': '#B9F2FF', 
                'Diamond 3': '#B9F2FF',
                'Elite': '#70dba5ff',
                'Champion': '#ee1000ff',
                'Unreal': '#4570fcff'
            };
            return fortniteColors[rankName] || '#4CAF50';
        }
        
        return '#4CAF50'; // 預設顏色
    }
    
    // 為每個排位配置顏色
    var coloredData = data.ranks.values.map(function(value, index) {
        var rankName = data.ranks.categories[index];
        return {
            value: value,
            itemStyle: {
                color: getRankColor(data.name, rankName)
            }
        };
    });
    
    var option = {
        title: {
            text: data.name + ' - 排位分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: data.ranks.categories,
            axisLabel: {
                rotate: 45,
                interval: 0
            }
        },
        yAxis: {
            type: 'value',
            name: '玩家數量'
        },
        series: [{
            data: coloredData,
            type: 'bar',
            label: {
                show: true,
                position: 'top',
                fontSize: 10
            }
        }]
    };
    rankChart.setOption(option);
}

// 創建玩家人數儀表盤
function createPlayerChart(data) {
    var option = {
        title: {
            text: data.name + ' - 線上玩家',
            left: 'center'
        },
        series: [{
            type: 'gauge',
            min: 0,
            max: data.maxPlayers,
            progress: {
                show: true,
                width: 18
            },
            axisLine: {
                lineStyle: {
                    width: 18
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                length: 15,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 12,
                formatter: function(value) {
                    if (value >= 1000000) {
                        return (value / 1000000) + 'M';
                    } else {
                        return (value / 1000) + 'K';
                    }
                }
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 25,
                itemStyle: {
                    borderWidth: 10
                }
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                fontSize: 40,
                offsetCenter: [0, '70%'],
                formatter: function(value) {
                    return value.toLocaleString();
                }
            },
            data: [{
                value: data.currentPlayers,
                name: '當前玩家'
            }]
        }]
    };
    playerChart.setOption(option);
}

// 創建年度趨勢折線圖
function createTrendChart(data) {
    var option = {
        title: {
            text: data.name + ' - 年度遊玩人數',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: data.yearlyTrend.months,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            name: '玩家數量'
        },
        series: [{
            data: data.yearlyTrend.players,
            type: 'line',
            smooth: true,
            areaStyle: {
                color: 'rgba(76, 127, 175, 0.2)'
            },
            lineStyle: {
                color: '#147ef7',
                width: 3
            },
            itemStyle: {
                color: '#147ef7'
            }
        }]
    };
    trendChart.setOption(option);
}

// 更新所有圖表
function updateCharts(gameName) {
    var data = gameData[gameName];
    createRankChart(data);
    createPlayerChart(data);
    createTrendChart(data);
}

// 遊戲切換功能
var gameItems = document.querySelectorAll('.game-item');
gameItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // 移除所有 active 狀態
        gameItems.forEach(function(i) {
            i.classList.remove('active');
        });
        // 添加當前 active 狀態
        this.classList.add('active');
        // 更新圖表
        var gameName = this.getAttribute('data-game');
        updateCharts(gameName);
    });
});

// 初始化顯示第一個遊戲的數據
updateCharts('valorant');

// 響應式調整
window.addEventListener('resize', function() {
    rankChart.resize();
    playerChart.resize();
    trendChart.resize();
});
