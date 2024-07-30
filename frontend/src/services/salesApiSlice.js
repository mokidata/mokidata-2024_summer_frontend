import { createSlice } from "@reduxjs/toolkit"
import { mokiApi } from "../app/api/loginApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    totalData:{},
    isLoading:true,
    error : false
}

export const totalThunks = createAsyncThunk(
  'saleSlice/fetchData',
  async (_,thunkAPI) => {
    let data = {"today":{},"predictToday":{},"predictDetail":{},"rankDetail":{},"rankCompare":{},"menuList":[],'lastDetail':{}}
    //오늘 날짜 받기
    const todayDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //날짜를 2024-07-28 형태로 변경하는 함수 
    function formatDate(date) {
      const local_Date = date.toLocaleDateString('ko-KR', options)
          .split('.')
          .map(part => part.trim())
          .join('-');
      return local_Date.endsWith('-') ? local_Date.slice(0, -1) : local_Date;
    }
    const today_date = formatDate(todayDate)
    
    //오늘 날짜를 초기에 받고 배열 첫 element로 세팅
    const yesterday = new Date()
    const lastWeek = new Date()
    const lastMonth = new Date()
    yesterday.setDate(yesterday.getDate()-1)
    lastWeek.setDate(lastWeek.getDate()-7)
    lastMonth.setDate(lastMonth.getDate()-30)
    const formattedYesterday = formatDate(yesterday)
    const formattedLastWeek= formatDate(lastWeek)
    const formattedLastMonth = formatDate(lastMonth)
    const daily_dates = []
    const weekly_dates = []
    const monthly_dates = []
    //daily_dates = 하루단위 매출 얻기위한 날짜들 [2024-07-28,2024-07-27,...]
    //weekly_dates = 주단위 매출 얻기위한 날짜들 [2024-07-28,2024-07-21,...]
    //monthly_dates = 월단위 매출 얻기위한 날짜들 [2024-07-28,2024-06-28,...]
    for(let i = 1; i< 5;i++){
      yesterday.setDate(yesterday.getDate()-1)
      lastWeek.setDate(lastWeek.getDate()-7)
      lastMonth.setDate(lastMonth.getDate()-30)
      const seven_days_ago = formatDate(lastWeek)
      const thirthy_days_ago = formatDate(lastMonth)
      const one_day_ago = formatDate(yesterday)
      daily_dates.push(one_day_ago)
      weekly_dates.push(seven_days_ago)
      monthly_dates.push(thirthy_days_ago)
    }

    try{
      const response = await mokiApi.get(`/api/date/daily`, {
        params: {
          localDate: today_date,
        },
      })
      data.today.daily = response.data
    }
    catch(error){
      data.today.daily = {}
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/date/weekly`, {
        params: {
          localDate: today_date,
        },
      })
      data.today.weekly = response.data
    }
    catch(error){
      data.today.weekly = {}
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/date/monthly`, {
        params: {
          localDate: today_date,
        },
      })
      data.today.monthly = response.data
    }
    catch(error){
      data.today.monthly = {}
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/predict/daily`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictToday.daily = response.data
    }
    catch(error){
      data.predictToday .daily= {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/weekly`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictToday.weekly = response.data
    }
    catch(error){
      data.predictToday.weekly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/monthly`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictToday.monthly = response.data
    }
    catch(error){
      data.predictToday.monthly = {}
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/predict/daily-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictDetail.daily = response.data
    }
    catch(error){
      data.predictDetail.daily = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/weekly-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictDetail.weekly= response.data
    }
    catch(error){
      data.predictDetail.weekly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/monthly-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.predictDetail.monthly = response.data
    }
    catch(error){
      data.predictToday.monthly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/sale/daily-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.rankDetail.daily = response.data
    }
    catch(error){
      data.rankDetail.daily = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/sale/weekly-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.rankDetail.weekly = response.data
    }
    catch(error){
      data.rankDetail.weekly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/sale/monthly-detail`, {
        params: {
          localDate: today_date,
        },
      })
      data.rankDetail.monthly = response.data
    }
    catch(error){
      data.rankDetail.monthly = {}
      console.log(error)
    }
    //일단위 오늘 비교
    let compare_data = {}
    let lastDetail = {}
    try{
      //어제 매출 디테일
      
      compare_data = {}
      const response = await mokiApi.get(`/api/sale/daily-detail`, {
        params: {
          localDate: formattedYesterday,
        },
      })
      if(response.status == 200){
        lastDetail['daily'] = response.data
        compare_data[formattedYesterday] = response.data
      }

      
      for(const dates of daily_dates){
        const response = await mokiApi.get(`/api/sale/daily-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200){
          compare_data[dates] = response.data
        }
      }
      data.rankCompare.daily = compare_data
    }
    catch(error){
      data.rankCompare.daily = compare_data
      console.log(error)
    }
    //지난주와 오늘 비교
    try{
      //지난주 주간 매출 디테일
      compare_data = {}
      const response = await mokiApi.get(`/api/sale/weekly-detail`, {
        params: {
          localDate: formattedLastWeek,
        },
      })
      if(response.status == 200){
        lastDetail['weekly'] = response.data
        compare_data[formattedLastWeek] = response.data
      }
      
      for(const dates of weekly_dates){
        const response = await mokiApi.get(`/api/sale/weekly-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200){
          compare_data[dates] = response.data
        }
      }
      data.rankCompare.weekly = compare_data
    }
    catch(error){
      data.rankCompare.weekly= compare_data
      console.log(error)
    }
    //지난달과 이번달 비교
    
    try{
      compare_data = {}
      //지난딜 주간 매출 디테일
      const response = await mokiApi.get(`/api/sale/weekly-detail`, {
        params: {
          localDate: formattedLastMonth,
        },
      })
      if(response.status == 200){
        lastDetail['monthly'] = response.data
        compare_data[formattedLastMonth] = response.data
      }
      for(const dates of monthly_dates){
        const response = await mokiApi.get(`/api/sale/monthly-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200){
          compare_data[dates] = response.data
        }
      }
      data.rankCompare.monthly = compare_data
    }
    catch(error){
      data.rankCompare.monthly= compare_data
      console.log(error)
    }
    data.lastDetail = lastDetail
    try{
      const response = await mokiApi.get(`/api/menu/list`)      
      data.menuList = response.data
    }
    catch(error){
      data.menuList = []
      console.log(error)
    }
    
    return data;
  }
  
);


export const saleSlice = createSlice({
  name: 'saleSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalThunks.pending,(state) => {
        state.isLoading = true
        console.log('loading')
      })
      .addCase(totalThunks.fulfilled,(state,action) => {
       
        state.totalData = action.payload
        console.log(state.totalData) 
        state.isLoading = false;
      })
     ;
  },
});




