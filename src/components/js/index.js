import axios from 'axios';
const MAX_QUESTION_LIMIT = 1;

class Operations{

    constructor(test_id){
        this._testID          = test_id;
        this._question        = {};
        this._options         = [];
        this._totalQuestion   = 0;
        this._perPageQuestion = MAX_QUESTION_LIMIT;
        this._currentPage     = 1;
    }

    async _getSections(){
        try{
            let id = this._testID;
            let {data} = await axios.post('https://www.apitest45.techmagnox.com/exam_api/section/',{id});
            this._defaultSection = data[0].id;
            return{
                defaultSection : this._defaultSection,
                sections       : data
            }
        }catch(e){
            throw new Error(e);
        }
    }

    _changeCurrentPage = (page,id) =>{
        this._currentPage = page;
        return this._getQuestion(id);
    }

    _next = (total, id) => {
        if(this._currentPage < total){
            this._currentPage++;
            return this._getQuestion(id);
        }
        // this._currentPage++;
        return this._getQuestion(id);
    }

    _prev = (id) => {
        if(this._currentPage > 1){
            this._currentPage--;
            return this._getQuestion(id);
        }
        return this._getQuestion(id);
    }

    _changeSection = (id) => {
        this._currentPage = 1;
        return this._getQuestion(id);
    }


    async _getQuestion(id){
        try{
            let defaultData = {
                id       : id,
                page     : this._currentPage,
                maxLimit : this._perPageQuestion
            };

            let {data} = await axios.post('https://www.apitest45.techmagnox.com/exam_api/question/',defaultData);
            this._totalQuestion  = data.totalRecords;
            this._question       = data.question;
            this._options        = data.options;
            return{
                records     :  this._totalQuestion,
                question    : this._question,
                options     : this._options,
                currentPage : this._currentPage,
                next        : this._next,
                prev        : this._prev,
                pageChange  : this._changeCurrentPage,
                sectionChange : this._changeSection
            }
        }catch(e){
            throw new Error(e);
        }
    }
}

export default Operations;