import Header from "@/components/Header";

async function ProfilePage({params}: {
  params: Promise<{ id: string }>
}) {

    const {id} = await params;
    return ( 
        <div>
            <Header title='aniket' subHeader="aniket@gmail.com" userImg='/assets/images/dummy.jpeg'/>
        </div>
     );
}

export default ProfilePage;