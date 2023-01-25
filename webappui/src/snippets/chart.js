/*We keep this snippet of code for the admin dashboard, so we can trace how many data is added overtime*/

function admin_data_added_dhbrd() {
    return (
        <SuiBox mb={3}>
            <Grid container spacing={3}>

                <Grid item xs={12} lg={7}>
                    <GradientLineChart
                        title="Number of data over time"
                        description={
                            <SuiBox display="flex" alignItems="center">
                                <SuiBox fontSize={size.lg} color="success" mb={0.3} lineHeight={0}>
                                    <Icon className="font-bold">arrow_upward</Icon>
                                </SuiBox>
                            </SuiBox>
                        }
                        height="20.25rem"
                        chart={gradientLineChartData}
                    />
                </Grid>
            </Grid>
        </SuiBox>);
}

export default admin_data_added_dhbrd