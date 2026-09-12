import mysql.connector 
def get_connection():
    return mysql.connector.connect(
        host="local host"
        user="root"
        password="website"
        database="Fasal-Bidge")
# Start Coding
# Create a database name Fasal-Bridge
#Create a seller table and a buyer table
#Starting with location
loc=int(input("Kindly write your location:")) 
# For phone number
Phone=int(input("Kindly enter your phone number:"))
#Making a function that will help user to login himself/herself or in case forget their passord he/she can change it also.
def login():
    while True:
        print()
        choice=input("1. Login \n,2. Forget password \n3. Exit")
        if choice.lower()=="login":
            username=int(input("Please enter your username:"))
            password=int(input("Please enter your password:"))
            # Through query will chek if this account exist in our website or not
            con=get_connection()
            cur=con.cursor()
            cur.execute("SELECT* FROM  users WHERE username=%s AND password=%s", (username, password))
            user = cur.fetchone()
            con.close()
            if user:
                print("Login successfully.Thank You")
                return True
            else:
                n=input("It seems that you have forgot your password (YES/NO):")
                if n.lower=="no":
                    print("Then try to login again")
                    break
                else:
                    Forgot_password()
                
def Buyer():
    a=input("Do you have any previous account?(YES/NO):")
    if a.lower=="no":
        name=input("Please enter your name :")
        username =int(input("You have to enter your username means a name that should be remembered or will use everytime when you use this website"))
        password=int(input("Please make your own password which you could able to remember by you easily:"))
        # WE can add whatever we want for the verification of buyer .I am for now adding Aadhar Number because it is way more common.
        aadhar=int(input("Please add your Aadhar card number :"))
        location=int(input("Please enter your full loaction which should contain state also:"))
        # making sql to get connect with the help of cursor and then inserting values
        print("Your information is stored successfully,Thank you very much .")
        login=input("Want to login ?(YES/NO):")
        if login.lower=="yes":
            login()
        else:
            print("Thank for your precious time")
    else a.lower=="yes":
         login=input("Want to login ?(YES/NO):")
         if login.lower=="yes":
             login()
         else:
             print("Thank for your precious time")





option=input("What would like to do ? (BUY/SELL):")
if option.lower== "buy":



