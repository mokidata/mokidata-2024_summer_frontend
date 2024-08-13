import i18next from 'i18next';
import {initReactI18next} from 'react-i18next'

import langEn from './lang.en.json'
import langKo from './lang.ko.json';


const resource = {
    en: {
        translation: langEn
    },
    ko: {
        translation: langKo
    }
}


i18next
    .use(initReactI18next)
    .init({
        resources: resource,
        // 초기 설정 언어
        lng: 'ko',
        fallbackLng: 'ko',
        debug: true 
    })
