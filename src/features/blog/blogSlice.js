import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    blogs: [],
    blog : {},
    edit:{blog:{},isEdit:false},
    blogLoading:false,
    blogSuccess : false,
    blogError: false,
    blogErrorMessage: ""

}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: { 
    editBlog : (state,action)=>{
        return{
            ...state,
            edit:{blog:action.payload,isEdit:true}
        }
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getBlogs.pending,(state,action)=>{
        state.blogLoading= true
    })
    .addCase(getBlogs.fulfilled,(state,action)=>{
        state.blogSuccess=false,
        state.blogLoading= false,
        state.blogs = action.payload
    })
    .addCase(getBlogs.rejected,(state,action)=>{
        state.blogError= true,
        state.blogSuccess= false,
        state.blogErrorMessage = action.payload
    })
    //single blog
    .addCase(getBlog.pending,(state,action)=>{
        state.blogLoading= true,
        state.blogError= false,
        state.blogSuccess=false
    })
    .addCase(getBlog.fulfilled,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=false,
        state.blog = action.payload
    })
    .addCase(getBlog.rejected,(state,action)=>{
        state.blogLoading= false,
        state.blogError= true,
        state.blogSuccess=false,
        state.blogErrorMessage = action.payload
    })
    // Create Blogs 
    .addCase(createBlog.pending,(state,action)=>{
        state.blogLoading= true,
        state.blogError= false,
        state.blogSuccess=false
    })
    .addCase(createBlog.fulfilled,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=true,
        state.blogs = [action.payload,...state.blogs]
    })
    .addCase(createBlog.rejected,(state,action)=>{
        state.blogLoading= false,
        state.blogError= true,
        state.blogSuccess=false,
        state.blogErrorMessage = action.payload
    })
    // Delete Blogs 
    .addCase(removeBlog.pending,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=false
    })
    .addCase(removeBlog.fulfilled,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=true,
        console.log(action.payload)
        state.blogs = state.blogs.filter(blog=>blog._id!==action.payload.id)
    })
    .addCase(removeBlog.rejected,(state,action)=>{
        state.blogLoading= false,
        state.blogError= true,
        state.blogSuccess=false,
        state.blogErrorMessage = action.payload
    })   
    // update Blogs 
    .addCase(updateBlog.pending,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=false
    })
    .addCase(updateBlog.fulfilled,(state,action)=>{
        state.blogLoading= false,
        state.blogError= false,
        state.blogSuccess=true,
        state.blogs = state.blogs.map(blog=>blog._id===action.payload._id?action.payload:blog),
        state.edit = {blog:{},isEdit:false}
    })
    .addCase(updateBlog.rejected,(state,action)=>{
        state.blogLoading= false,
        state.blogError= true,
        state.blogSuccess=false,
        state.blogErrorMessage = action.payload
    })
  }

});

export const {editBlog} = blogSlice.actions
export default blogSlice.reducer

//Thunk api 

export const getBlogs = createAsyncThunk("FETCH/BLOGS", async(_,thunkAPI)=>{
   try {
        const response = await axios.get("https://blog-backend-ten-psi.vercel.app/api/blogs")
        return response.data 
   } catch (error) {
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
   }
})

// Single blog
export const getBlog = createAsyncThunk("FETCH/BLOG", async(id,thunkAPI)=>{
   try {
        const response = await axios.get("https://blog-backend-ten-psi.vercel.app/api/blogs/" + id)
        
        return response.data 
   } catch (error) {
       
        // let message = error.response.data.msg
        // return thunkAPI.rejectWithValue(message)
        console.log(thunkAPI.rejectWithValue())
   }
})

// 69c671ed677ba08af37dc389
//error.status==500?"Server Error":

// Create Blogs 

export const createBlog = createAsyncThunk("CREATE/BLOG", async(formData,thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

   try {
       const response = await axios.post("https://blog-backend-ten-psi.vercel.app/api/blogs",formData,
        {headers:{
            authorization:`Bearer ${token}`
        }})
       return response.data


   } catch (error) {
       
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
   }
})
// Delete Blogs
export const removeBlog = createAsyncThunk("REMOVE/BLOG", async(id,thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

   try {
       const response = await axios.delete("https://blog-backend-ten-psi.vercel.app/api/blogs/"+id,
        {headers:{
            authorization:`Bearer ${token}`
        }})
       
       return response.data


   } catch (error) {
       
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
   }
})
// Update blogs 
export const updateBlog = createAsyncThunk("UPDATE/BLOG", async(formData,thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

   try {
       const response = await axios.put("https://blog-backend-ten-psi.vercel.app/api/blogs/"+formData._id,formData,
        {headers:{
            authorization:`Bearer ${token}`
        }})
       return response.data


   } catch (error) {
       
        let message = error.response.data.msg
        return thunkAPI.rejectWithValue(message)
   }
})

