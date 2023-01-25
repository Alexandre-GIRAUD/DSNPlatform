// @mui material components
import Grid from "@mui/material/Grid";
import {useContext,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SuiBox from "../../components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "../../examples/Lists/ProfilesList";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";

// Data
import profilesListData from "./data/profilesListData";
import {SoftUI} from "../../context/softUIContext"


function Overview() {
  const [editProfile,setEditProfile] = useState(false)
  const history = useHistory()
  async function handleLogIn(e){
    history.push("/authentication/login")
  }
  async function handleSignUp(e){
    history.push("/authentication/sign-up")
  }
  async function handleEditProfile(e){
    e.preventDefault()
    setEditProfile(true)
  }
  const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)
  if (Object.keys(currentUser).length === 0) {
    return (
      <DashboardLayout>
      <Button variant="info" className="w-100" onClick={handleSignUp}>Sign Up</Button>
      <Button onClick={handleLogIn} className="w-100">Login</Button>
      </DashboardLayout>
    )
  } else {

// Case edit profile on
    if (editProfile) {
      return(
      <DashboardLayout>
      <Header />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: currentUser.email,
                location: "USA",
                id : currentUser.uid,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  );}

// Case edit profile off
  else{
  return (
    <DashboardLayout>
      <Header />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: currentUser.email,
                location: "USA",
                id : currentUser.uid,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  );
}}}

export default Overview;
