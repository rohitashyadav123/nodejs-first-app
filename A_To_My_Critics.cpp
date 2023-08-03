//Jai Shree Shyam
// Salasar Darbaar
#include <bits/stdc++.h>
using namespace std;
#define int int64_t

signed main()
{
    int t,a,b,c;
    cin >> t;
    while (t--)
    {;
        cin>>a>>b>>c;
        if(a+b>=10)
        {
            cout<<"YES"<<endl;
        }
        else if (a+c>=10)
        {
           cout<<"YES"<<endl;
        }
        else if(b+c>=10)
        {

        cout<<"YES"<<endl;
        }
        else{
            cout<<"NO"<<endl;
        }
        
    }
}