import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
  import FlexBetween from "../../components/FlexBetween";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../../state";
  import axios from "axios"
  
  const MyPostWidget = ({ picturePath }) => {
    const [isFetching,setIsFetching]=useState(false);
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const[file,setFile]=useState("")
    const [image, setImage] = useState(null);
    const [post, setPost] = useState();
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handlePost = async () => {
      setIsFetching(true);
      try{

        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (file) {
          const formDataImage=new FormData();      
          formDataImage.append("file",file)
          formDataImage.append("upload_preset","upsjg6yy")
          const res=  await axios.post("https://api.cloudinary.com/v1_1/dvjc0fusx/image/upload",formDataImage)   
          const photoid=res.data.public_id.split("/")[1];
          formData.append("picturePath",photoid)
        }
        
        const response = await fetch(`https://social-media-server-6joo.onrender.com/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setFile("");
        setPost("");
      }catch(err){
        setIsFetching(false);
      }
      setIsFetching(false);
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                  m="0.5rem"
                >
             
                  <label htmlFor="fileInput">
                  <Box
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                     
                      {file ? <p>{file.name}</p>:<p>Add Image Here</p>} 
                          
                      </Box>
       
          </label>
                  <input id="fileInput" type="file" style={{ display: "none" }} 
            onChange={(e)=>setFile(e.target.files[0])}
          />
                </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!post || isFetching}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >{
            isFetching ? (
              <ClipLoader
        color="white"
        loading={isFetching}
        
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
            ):'POST'
          }
            
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;
