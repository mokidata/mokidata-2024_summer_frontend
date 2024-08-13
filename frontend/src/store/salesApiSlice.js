import { createSlice } from "@reduxjs/toolkit"
import { mokiApi } from "../services/loginApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";
import { formatDate } from "../functions/DateConverter";

const initialState = {
    totalData:{},
    isLoading:true,
    error : false
}

export const totalThunks = createAsyncThunk(
  'saleSlice/fetchData',
  async (initialFormatDate,thunkAPI) => {
    let data = {"date":initialFormatDate,"today":{},"predictNext":{}, "predictToday":{},"predictLast":{},"predictDetail":{},"rankDetail":{},"rankCompare":{},"menuList":[],'lastDetail':{}}
    
    //토큰 가져다 쓰기
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        mokiApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    //비교를 위한 어제, 일주일 전 , 한달 전 데이터 가져오기
    const yesterday = new Date(initialFormatDate)
    const lastWeek = new Date(initialFormatDate)
    const lastMonth = new Date(initialFormatDate)
    const tomorrow = new Date(initialFormatDate)
    const nextWeek =  new Date(initialFormatDate)
    const nextMonth =  new Date(initialFormatDate)
    yesterday.setDate(yesterday.getDate()-1)
    lastWeek.setDate(lastWeek.getDate()-7)
    lastMonth.setDate(lastMonth.getDate()-30)
    tomorrow.setDate(tomorrow.getDate()+1)
    nextWeek.setDate(nextWeek.getDate()+7)
    nextMonth.setDate(nextMonth.getDate()+30)
    // 다음 주의 월요일 구하기
    nextWeek.setDate(nextWeek.getDate() - nextWeek.getDay() + 1);
    // 다음 달의 1일 구하기
    nextMonth.setDate(1); // 1일로 설정

    
    const formattedYesterday = formatDate(yesterday)
    const formattedLastWeek= formatDate(lastWeek)
    const formattedLastMonth = formatDate(lastMonth)
    const formattedTomorrow = formatDate(tomorrow)
    const formattedNextWeek= formatDate(nextWeek)
    const formattedNextMonth = formatDate(nextMonth)
    const daily_dates = []
    const weekly_dates = []
    const monthly_dates = []
    //daily_dates = 하루단위 매출 얻기위한 날짜들 [2024-07-28,2024-07-27,...]
    //weekly_dates = 주단위 매출 얻기위한 날짜들 [2024-07-28,2024-07-21,...]
    //monthly_dates = 월단위 매출 얻기위한 날짜들 [2024-07-28,2024-06-28,...]
    for(let i = 1; i< 4;i++){
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
        },
      })
      data.predictToday.monthly = response.data
    }
    catch(error){
      data.predictToday.monthly = {}
      console.log(error)
    }

    // 예측값과 실제 매출값 비교를 위한 어제, 지난주, 지난달 예측값
    try{
      const response = await mokiApi.get(`/api/predict/daily`, {
        params: {
          localDate: formattedYesterday,
        },
      })
      data.predictLast.daily = response.data
      console.log(formattedYesterday)
    }
    catch(error){
      data.predictLast.monthly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/weekly`, {
        params: {
          localDate: formattedLastWeek,
        },
      })
      console.log(formattedLastWeek)
      data.predictLast.weekly = response.data
    }
    catch(error){
      data.predictLast.weekly = {}
      console.log(error)
    }


    try{
      const response = await mokiApi.get(`/api/predict/monthly`, {
        params: {
          localDate: formattedLastMonth,
        },
      })
      
      data.predictLast.monthly = response.data
    }
    catch(error){
      data.predictLast.monthly = {}
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/predict/daily-detail`, {
        params: {
          localDate: formattedTomorrow,
        },
      })
      data.predictNext.daily = response.data
      data.predictNext.daily.date = formattedTomorrow
      
    }
    catch(error){
      data.predictNext.monthly = {}
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/predict/weekly-detail`, {
        params: {
          localDate: formattedNextWeek,
        },
      })
     
      data.predictNext.weekly = response.data
      data.predictNext.weekly.date = formattedNextWeek

    }
    catch(error){
      data.predictNext.weekly = {}
      console.log(error)
    }

    
    try{
      const response = await mokiApi.get(`/api/predict/monthly-detail`, {
        params: {
          localDate: formattedNextMonth,
        },
      })
     
      data.predictNext.monthly = response.data
      data.predictNext.monthly.date = formattedNextMonth
    }
    catch(error){
      data.predictNext.monthly = {}
      console.log(error)
    }


    try{
      const response = await mokiApi.get(`/api/predict/daily-detail`, {
        params: {
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
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
          localDate: initialFormatDate,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        data.rankDetail.daily = response.data.saleGetResList
      }
      
    }
    catch(error){
      data.rankDetail.daily = []
      console.log(error)
    }
    try{
      const response = await mokiApi.get(`/api/sale/weekly-detail`, {
        params: {
          localDate: initialFormatDate,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        data.rankDetail.weekly = response.data.saleGetResList
      }
    }
    catch(error){
      data.rankDetail.weekly = []
      console.log(error)
    }

    try{
      const response = await mokiApi.get(`/api/sale/monthly-detail`, {
        params: {
          localDate: initialFormatDate,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        data.rankDetail.monthly = response.data.saleGetResList
      }
    }
    catch(error){
      data.rankDetail.monthly = []
      console.log(error)
    }
    
    //어제 매출 디테일
    let compare_data = {}
    try{
      const response = await mokiApi.get(`/api/sale/daily-detail`, {
        params: {
          localDate: formattedYesterday,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        //구한 값 state에 집어 넣기
        data.lastDetail['daily'] = response.data.saleGetResList
        compare_data[formattedYesterday] = response.data.saleGetResList
      }
    }
    catch(error){
      data.lastDetail['daily'] = []
      compare_data[formattedYesterday] = []
      console.log(error)
    }
    
    //일단위 오늘 비교
    try{
      for(const dates of daily_dates){
        const response = await mokiApi.get(`/api/sale/daily-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200 && response.data.saleGetResList !== undefined){
          compare_data[dates] = response.data.saleGetResList
        }
      }
      //구한 값 state에 집어 넣기
      data.rankCompare.daily = compare_data
    }
    catch(error){
      data.rankCompare.daily = compare_data
      console.log(error)
    }

    compare_data = {}
    //지난주와 오늘 비교
    try{
      const response = await mokiApi.get(`/api/sale/weekly-detail`, {
        params: {
          localDate: formattedLastWeek,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        //구한 값 state에 집어 넣기
        data.lastDetail['weekly'] = response.data.saleGetResList
        compare_data[formattedLastWeek] = response.data.saleGetResList
      }
    }
    catch{
      data.lastDetail['weekly'] = []
      compare_data[formattedLastWeek] = []
    }
    
    //지난주 주간 매출 디테일
    try{
      for(const dates of weekly_dates){
        const response = await mokiApi.get(`/api/sale/weekly-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200 && response.data.saleGetResList !== undefined){
          compare_data[dates] = response.data.saleGetResList
        }
      }
      //구한 값 state에 집어 넣기
      data.rankCompare.weekly = compare_data
    }
    catch(error){
      data.rankCompare.weekly= compare_data
      console.log(error)
    }


    compare_data = {}
    try{
      const response = await mokiApi.get(`/api/sale/monthly-detail`, {
        params: {
          localDate: formattedLastMonth,
        },
      })
      if(response.status == 200 && response.data.saleGetResList !== undefined){
        //구한 값 state에 집어 넣기
        data.lastDetail['monthly'] = response.data.saleGetResList
        compare_data[formattedLastMonth] = response.data.saleGetResList
      }
    }
    catch{
      data.lastDetail['monthly'] = []
      compare_data[formattedLastMonth] = []
    }
    //지난달과 이번달 비교
    try{
      
      //지난달 월간 매출 디테일
      
      for(const dates of monthly_dates){
        const response = await mokiApi.get(`/api/sale/monthly-detail`, {
          params: {
            localDate: dates,
          },
        })
        if (response.status == 200 && response.data.saleGetResList !== undefined){
          compare_data[dates] = response.data.saleGetResList
        }
      }
      //구한 값 state에 집어 넣기
      data.rankCompare.monthly = compare_data
    }
    catch(error){
      data.rankCompare.monthly= compare_data
      console.log(error)
    }
    
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
    clearStore: (state) => {
      // 상태를 초기 상태로 리셋
      console.log(initialState)
      return initialState;
    },
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

export const { clearStore } = saleSlice.actions;



