# mqtt-controler


<div dir='rtl' align='right'>
מספק ניהול ושליטה מרחוק על mqtt relay.

דוגמא למוצר נתמך: https://he.aliexpress.com/item/4000999069820.html

## הוראות הרצה:

להפעיל את קובץ משתני סביבה:
</div>

```
cp .env-sipmle .env
```

<div dir='rtl' align='right'>
ולעדכן הגדרות.

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
בפניה לממש האינטרנטי יש לצרף את הערך "systemCode" עם הסיסמה.
לדוגמא: https://example.com/?systemCode=MyCode

<div dir='rtl' align='right'>

## הפעלה:

### דוקר:
על ידי דוקר:

יש לעדכן את הפורטים לחשיפה ב runme.sh
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

  
</div>
