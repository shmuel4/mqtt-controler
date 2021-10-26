# mqtt-controler


<div dir='rtl' align='right'>
מספק ניהול ושליטה מרחוק על mqtt relay.

דוגמא למוצר נתמך: https://he.aliexpress.com/item/4000999069820.html

## הוראות הרצה:

להעתיק את קובץ משתני סביבה וקובץ הגדרות ערוצים
</div>

```
mv .env-sipmle .env
mv channelsList.json.Example channelsList.json
```

<div dir='rtl' align='right'>
ולעדכן הגדרות.
בתוך הקבצים יש הסבר על ההגדרות הרלוונטיות

על מנת לפנות למערכת בIVR בימות המשיח יש להכניס בשלוחה:
</div>

```
type=api
api_link=XXXXXXX/ivr
api_add_0=systemCode=XXXX
```
<div dir='rtl' align='right'>
וליצור תיקיה /0 כ
</div>


```
type=hangup
```

<div dir='rtl' align='right'>
ניתן גם שתיקיה 0 תחזיר לאותה השלוחה ויהיה אפשרות להמשיך את הניהול
</div>


<div dir='rtl' align='right'>
בפניה לממש האינטרנטי יש לצרף את הערך "systemCode" עם הסיסמה.
לדוגמא: https://example.com/?systemCode=MyCode

## הפעלה:

 
### דוקר:

יש לעדכן לפני הפעלה את הפורטים לחשיפה ב runme.sh
  
</div>

```
./buildme.sh ;./runme.sh
```
  

<div dir='rtl' align='right'>
  
### הפעלה רגילה:
  
</div>
  
```
npm install
npm start
```

<div dir='rtl' align='right'>
  
## תמונות מסך

  ![image](https://user-images.githubusercontent.com/60587313/138574648-a73f75a6-d4cd-4a88-a243-ebe2067797cf.png)

  
  ![image](https://user-images.githubusercontent.com/60587313/138574659-09cbea72-3355-4a33-ab81-f7b075a0053d.png)

  
 ![image](https://user-images.githubusercontent.com/60587313/138790836-09f2516e-af45-4128-822e-2246eea51575.png)

</div>
