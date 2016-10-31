var projects = new Chartist.Bar('.project-count', {
	labels: ['2000', '2005', '2009', '2010', '2011', '2012', '2013', '2014', '2015',],
	series: [
		[10, 13, 18, 20, 22, 25, 28, 30, 34]
	]
}, {
	high: 40,
	axisX: {
		labelInterpolationFnc: function(value, index) {
			return index % 2 === 0 ? value : null;
		}
	}
});

projects.on('draw', function(data) {
	if (data.type === 'bar') {
		data.group.append(new Chartist.Svg('circle', {
			cx: data.x2,
			cy: data.y2,
			r: 25
		}, 'ct-slice-pie'));
		data.group.append(new Chartist.Svg('text', {
			transform: "matrix(1 0 0 1 "+(data.x2 - 7)+" "+(data.y2 + 4)+")",
			fill: "#FFF",
			value: "test"
		}, 'ct-slice-text').text(data.value.y));
	}
});
