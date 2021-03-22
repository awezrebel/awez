import twilio
import random
from twilio.rest import Client 
otp = random.randint(1000, 9999)
f = open( 'otp.txt', 'w' )
f.write(str(otp))
f.close()
print(otp)
account_sid = 'AC8264268afd653fe5cbd8cf019bd2f0ae' 
auth_token = '58ad049c10b49597cf6cd2e08c011c37' 
client= Client(account_sid, auth_token) 
message = client.messages.create( 
body='Your OTP is-' + str(otp), 
from_='+12512573562', 
to = '+916303731463' 
)

print(message.sid) 
