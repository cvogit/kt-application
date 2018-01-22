<script type="text/javascript">

	var SetUp = (baseUrl, userId) => {
		// Fetch user basic information
		axios.get(baseUrl+'/users/'+userId
		)
		.then(function (response) {
			ipcRenderer.send('userInfoSuccess', response.data.result);
		})
		.catch(function (error) {
			
		});

		// Fetch user roles
		axios.get(baseUrl+'/users/'+userId+'/roles'
		)
		.then(function (response) {
			ipcRenderer.send('userRolesSuccess', response.data.result);
		})
		.catch(function (error) {
			
		});
	}

	module.exports.SetUp = SetUp;
</script>