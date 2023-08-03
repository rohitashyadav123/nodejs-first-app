#include<bits/stdc++.h>
using namespace std;
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
       long long int n;
        cin>>n;
        int ans=0;
        int fans=0;
        for(int i=1;i<=100;i++)
        {
            if(n%i==0)
            {
                ans++;
            }
            else{
                fans=max(ans,fans);
                ans=0;
            }
        }
        cout<<fans<<endl;
    }
}
