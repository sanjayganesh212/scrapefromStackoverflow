
var commonfile = require('../helper/scraperfile.js')
var encryptDrycpt = require('../helper/encryptDecrypt.js')
const { Validator } = require('node-input-validator');
const famousLang = require('../models/famousLang.js');
const toptags = require('../models/toptags.js');
const common = require('../helper/scraperfile.js');
const { ObjectId } = require('mongodb');


/// scrap tags from url and insert in db
exports.scraptagData = async (req, res) => {


    try {
        let dbdata = await toptags.find({})
        if (dbdata && dbdata.length == 0) {
            let url = 'https://stackoverflow.com/tags'
            let result = await common.extractAndWriteToFile(url);
            if (result?.status == 1) {
                if (result?.data?.tags?.length != 0) {
                    let array = result.data.tags != undefined ? result.data.tags : [];
                    const tags = array.map(tagName => ({ name: tagName }));
                    try {

                        await toptags.insertMany(tags);

                    } catch (error) {

                        res.json({
                            status: 500,
                            message: "Internal server error"
                        })

                    } finally {
                        res.json({

                            status: 201,
                            message: "Tags are scraped from Stackoverflow"
                        })
                    }

                } else {
                    res.json({
                        status: 200,
                        message: "Tags Are not avaliable from stakeoverflow rightnow"
                    })
                }


            }

            else {
                res.json({
                    status: 402,
                    message: "Something Went wrong"
                })
            }

        } else {
            res.json({
                status: 200,
                message: "Tags Are Already Scrapted from Stackoverflow"
            })
        }

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}

exports.gettags = async (req, res) => {

    try {
        let fetrchtags = await toptags.find({})

        if (fetrchtags && fetrchtags.length > 0) {
            const resultArray = fetrchtags.map(({ _id, name }) => ({ _id, name }));
            res.json({
                status: 200,
                data: resultArray
            })

        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}


exports.gettagsById = async (req, res) => {

    try {
        const validationcheck = new Validator(req.body, {
            tagid: 'required',
        });

        validationcheck.check().then(async (matched) => {
            if (!matched) {
                let erkey = Object.keys(validationcheck.errors)
                let err = validationcheck.errors[erkey[0]].message;
                res.json({
                    status: 422,
                    message: err
                })
                res.end();

            } else {
                let { tagid } = req.body;
                let idvalid = await isValidObjectId(tagid)
                if (idvalid) {
                    try {
                        let GetTagById = await toptags.findById({ _id: tagid })
                        res.json({
                            status: 200,
                            data: GetTagById
                        })

                    } catch (error) {
                        console.log("console--->> ~ error:", error)
                        res.status(500).json({ error: 'Internal Server Error' });

                    }

                } else {
                    res.json({
                        status: 403,
                        message: 'Invalid Id format'
                    })
                }


            }

        })

    } catch (error) {
        console.log("console--->> ~ error:", error)
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

function isValidObjectId(id) {

    return new Promise((resolve, reject) => {
        resolve(ObjectId.isValid(id));
    })
}