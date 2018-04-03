<!---
WS1.cfc
--->



<cfcomponent displayname="Life Coach webservice 1" hint="Primary webservice" output="false">



    <cfset application.dsn="lc">

<cfheader name="Access-Control-Allow-Origin" value="*">

    <!--- Constructor --->
            <!---
    <cffunction name="init" access="Public" returntype="areteDAO1" output="false" hint="Initialises the controller">


        <cfreturn this />
    </cffunction>

--->


<cffunction name="login" access="remote" returntype="Any" output="false" returnformat="json">



    <cfargument name="mobileNo" type="string" required="true">
    <cfargument name="userPassword" type="string" required="true">

    <cfset updatedProfile = 0>


    <cfif len(trim(arguments.mobileNo)) and len(trim(arguments.userPassword))>


        <!--- search for profile in datanase --->
            <cfquery name="checkValid" datasource="#application.dsn#" maxrows="1">
                select *
                from Huser
                where mobileNo = '#arguments.mobileNo#'
                and currentPassword = '#arguments.userPassword#'
                and activeYN = 1
            </cfquery>
            <cfif checkValid.recordcount>
                <cfset thisUUID = #createUUID()#>

             <!--- Add UUID to user propfile and log history --->
                <cftransaction>
                    <cfquery name="updCurrent" datasource="#application.dsn#">
                        update Huser
                        set currentUUID = '#thisUUID#'
                        where HuserID = #checkValid.HuserID#
                    </cfquery>
                    <cfquery name="changeHistory" datasource="#application.dsn#">
                        insert into changeUUID
                            (HuserID, newUUID)
                        values
                            (#checkValid.HuserID#,'#thisUUID#')

                    </cfquery>




                </cftransaction>
                <!--- return UUID --->
                    <cfquery name="updatedProfile" datasource="#application.dsn#" maxrows="1">
                        select *
                        from Huser
                        where HuserID = #checkValid.HuserID#
                    </cfquery>



                <cfelse>
                    <cfquery name="updatedProfile" datasource="#application.dsn#" maxrows="1">
                        select *
                        from Huser
                        where HuserID = 0
                    </cfquery>
                </cfif>






        <cfelse>

                    <cfquery name="updatedProfile" datasource="#application.dsn#" maxrows="1">
                        select *
                        from Huser
                        where HuserID = 0
                    </cfquery>








        </cfif>

    <cfreturn  updatedProfile>
</cffunction>



<cffunction name="checkValidCurrentUser" access="remote" returntype="string" output="false" returnformat="JSON">
    <cfargument name="UUID" required="true" type="string">

        <cfset validatedUUID = ''>

         <cfquery name="checkValid" datasource="#application.dsn#" maxrows="1">
            select *
            from Huser
            where currentUUID = '#trim(arguments.UUID)#'
            and activeYN = 1
        </cfquery>
        <cfif checkValid.recordcount>
            <cfset validatedUUID = 'Yessir'>
        <cfelse>
            <cfset validatedUUID = 'no jose'>
        </cfif>

        <cfreturn validatedUUID>


</cffunction>




<cffunction name="recordCheat1" access="remote" returntype="string" output="true" returnformat="JSON">



    <cfargument name="userID" type="numeric" required="true">
    <cfargument name="UUID" type="string" required="true">
    <cfargument name="cheatID" type="string" required="true">

    <cfargument name="newCheatDesc" type="string" required="false">
    <cfargument name="cheatdateTime" type="string" required="true">
    <cfargument name="comments" type="string" required="true">

    <cfif len(trim(newCheatDesc))>
        <cfset arguments.cheatID = 1>
            <cfquery name="checkDup" datasource="#application.dsn#">
                select DD_cheatID
                from DD_cheat
                where shortDescription = '#trim(arguments.newCheatDesc)#'
                and UUID = '#arguments.UUID#'
                and activeYN = 1
            </cfquery>
            <cfif checkDup.recordcount >
                <cfset arguments.cheatID = checkDup.DD_cheatID>
            <cfelse>
               <cfquery name="insNewCheat" datasource="#application.dsn#">
                    insert into DD_cheat
                        (userUUID, shortDescription,longdescription, addedby, activeYN )
                    values
                        ('#arguments.UUID#','#trim(arguments.newCheatDesc)#','#arguments.comments#',#arguments.userID#,1)
                </cfquery>
                <cfquery name="checkID" datasource="#application.dsn#" maxrows="1">
                    select DD_cheatID
                    from DD_cheat
                    where shortDescription = '#trim(arguments.newCheatDesc)#'
                    and addedby = #arguments.userID#
                    and activeYN = 1
                    order by DD_cheatID desc
                </cfquery>
                 <cfset arguments.cheatID = checkID.DD_cheatID>



            </cfif>
        </cfif>

        <cfset thisDump="D:\ColdFusion11\cfusion\wwwroot\FPS\cfdump/cfdump.txt">

        <cfset thisEventDate = parseDateTime(arguments.cheatdateTime, "yyyy-MM-dd'T'HH:mm")>


    <cfquery name="getClass2" datasource="#application.dsn#">
        insert into cheatEvent
            (HuserID, DD_cheatID, eventDateTime, comments )
        values
            (#arguments.userID#, #arguments.cheatID#,#createodbcdatetime(thisEventDate)#,'#arguments.comments#')
    </cfquery>



        <cfset responseString = '200'>

    <cfreturn responseString />
</cffunction>




</cfcomponent>
