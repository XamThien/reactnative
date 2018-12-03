export const LIST_SPECIALITY = [
    {id: "00", name: "TẤT CẢ CHUYÊN NGÀNH"},
    {id: "01", name: "CƠ-XƯƠNG-KHỚP"},
    {id: "02", name: "THẦN KINH"},
    {id: "03", name: "TIÊU HOÁ"},
    {id: "04", name: "TIM MẠCH"},
    {id: "05", name: "TAI MŨI HỌNG"},
    {id: "06", name: "BỆNH CỘT SỐNG"},
    {id: "07", name: "SẢN PHỤ KHOA"},
    {id: "08", name: "NHI KHOA"},
    {id: "09", name: "BỆNH VIÊM GAN"}
];

export const LIST_DOCTOR = [
    {
        id: 1,
        idSpeciality: 3,
        speciality: "Khoa Tiêu Hoá",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn A",
        age: 41,
        isOnline: false,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                isAvailable: true,
                disease: [{"id": 3,"name": "Khám Gan"},{"id": 4,"name": "Khám Phổi"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 3,"name": "Khám Gan"},{"id": 4,"name": "Khám Phổi"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 3,"name": "Khám Gan"},{"id": 4,"name": "Khám Phổi"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    },
    {
        id: 2,
        idSpeciality: 3,
        speciality: "Khoa Tiêu Hoá",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn B",
        age: 41,
        isOnline: true,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                isAvailable: false,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 1,"name": "Khám Dạ Dày"},{"id": 2,"name": "Khám Ruột Thừa"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 1,"name": "Khám Dạ Dày"},{"id": 2,"name": "Khám Ruột Thừa"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 1,"name": "Khám Dạ Dày"},{"id": 2,"name": "Khám Ruột Thừa"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    },
    {
        id: 3,
        idSpeciality: 2,
        speciality: "Khoa Thần Kinh",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn C",
        age: 41,
        isOnline: true,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 5,"name": "Khám Thận"},{"id": 6,"name": "Khám Tim"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 5,"name": "Khám Thận"},{"id": 6,"name": "Khám Tim"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 5,"name": "Khám Thận"},{"id": 6,"name": "Khám Tim"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    },
    {
        id: 4,
        idSpeciality: 8,
        speciality: "Khoa Nhi",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn D",
        age: 41,
        isOnline: true,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                isAvailable: false,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 7,"name": "Khám Tổng Quát"},{"id": 8,"name": "Khám Răng Hàm Mặt"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 7,"name": "Khám Tổng Quát"},{"id": 8,"name": "Khám Răng Hàm Mặt"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 7,"name": "Khám Tổng Quát"},{"id": 8,"name": "Khám Răng Hàm Mặt"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    },
    {
        id: 5,
        idSpeciality: 8,
        speciality: "Khoa Nhi",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn E",
        age: 41,
        isOnline: true,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 9,"name": "Khám Tai Mũi Họng"},{"id": 10,"name": "Khám Xương Khớp"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 9,"name": "Khám Tai Mũi Họng"},{"id": 10,"name": "Khám Xương Khớp"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 9,"name": "Khám Tai Mũi Họng"},{"id": 10,"name": "Khám Xương Khớp"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    },
    {
        id: 6,
        idSpeciality: 4,
        speciality: "Tim Mạch",
        education: "Phó Giáo Sư, Tiến Sĩ",
        name: "Nguyễn Văn F",
        age: 41,
        isOnline: true,
        schedule: [
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-01",
                minute: "20",
                isAvailable: false,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 11,"name": "Khám Ruột Thừa"},{"id": 12,"name": "Khám Đại Tràng"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-02",
                minute: "20",
                isAvailable: true,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 11,"name": "Khám Ruột Thừa"},{"id": 12,"name": "Khám Đại Tràng"}]
            },
            {
                startTime: "08:00",
                endTime: "12:00",
                date: "2018-10-03",
                minute: "20",
                isAvailable: false,
                timeAvailable: "08:00;08:20;08:40;09:00;09:20;09:40;10:00;10:20;10:40",
                disease: [{"id": 11,"name": "Khám Ruột Thừa"},{"id": 12,"name": "Khám Đại Tràng"}]
            }],
        description: "",
        avata: "../../../../assets/icon_start.png"
    }
];


export var LIST_TIME_AVAILABLE = [
    {
        id: "001",
        hour: "1 AM",
        degrees: 57,
        selected: false
    },
    {
        id: "002",
        hour: "2 AM",
        degrees: 46,
        selected: false
    },
    {
        id: "003",
        hour: "3 AM",
        degrees: 45,
        selected: false
    },
    {
        id: "004",
        hour: "4 AM",
        degrees: 60,
        selected: false
    },
    {
        id: "005",
        hour: "5 AM",
        degrees: 62,
        selected: false
    },
    {
        id: "006",
        hour: "6 AM",
        degrees: 55,
        selected: false
    }
];


export var LIST_CONSULTANT_TYPE = [
    {
        id: "001",
        name: "Bác sĩ đa khoa",
        selected: false,
    },
    {
        id: "002",
        name: "Bác sĩ chuyên ngành",
        selected: false,
    },
    {
        id: "003",
        name: "Vật lí trị liệu",
        selected: false,
    },

];

export var LIST_MODAL_NAME = [
    {
        id: "001",
        image: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        userName: "Nguyễn Văn A",
        selected: false,
    },
    {
        id: "002",
        image: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        userName: "Nguyễn Văn B",
        selected: false,
    },
    {
        id: "003",
        image: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        userName: "Nguyễn Văn C",
        selected: false,
    },
    {
        id: "004",
        image: "https://facebook.github.io/react-native/docs/assets/favicon.png",
        userName: "Nguyễn Văn D",
        selected: false,
    },
];