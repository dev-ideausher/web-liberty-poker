"use client"
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import Toggler from '@/components/Toggler'
import React, { useState } from 'react'

export default function SitSettings() {
    const [invitationSelected,setinvitationSelected] = useState("password")
    const [reEntrySelected,setReEntrySelected] = useState("allowed")
    return (
        <div className='w-full grid grid-cols-3 gap-20 px-5 pb-12'>
            <div>
                <h4 className='text-[30px] font-normal text-primary'>GAME TYPE</h4>
                <Dropdown placeholder="Select game type" data={["Texas Hold’em","Texas Hold’em","Texas Hold’em"]} />
                <h4 className='text-[30px] font-normal text-primary mt-5'>PLAYER CAPACITY</h4>
                <div className='w-full border border-white rounded-md grid grid-cols-2'>
                    <div className='flex items-center justify-between px-2'>
                        <p className='text-2xl font-extralight text-white'>min</p>
                        <Input type="number" className="w-1/3 text-right border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={2} />
                    </div>
                    <div className='flex items-center justify-between border-l border-white px-3'>
                        <p className='text-2xl font-extralight text-white'>max</p>
                        <Input type="number" className="w-1/3 text-right border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={9} />
                    </div>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-5'>TABLE DURATION</h4>
                <div className='flex items-center gap-3'>
                    <div className='w-2/3'>
                        <Dropdown placeholder="Timed session" data={["Timed session","Unlimited"]} />
                    </div>
                    <div className='flex items-center justify-center rounded-md border border-white px-1 w-1/3 gap-2'>
                        <Input type="number" className="w-1/3 text-right border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={9} />
                        <p className='text-2xl font-normal text-white'>min</p>
                    </div>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-5'>INVITATION CONTROL</h4>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="password"
                            name="invitation"
                            value="password"
                            checked={invitationSelected === "password"}
                            onChange={() => setinvitationSelected("password")}
                            className="cursor-pointer size-7"
                        />
                        <label
                            htmlFor="password"
                            className={`text-2xl font-normal cursor-pointer transition ${
                                invitationSelected === "password" ? "text-primary" : "text-white"
                            }`}
                        >
                        Password
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="invite"
                            name="invitation"
                            value="invite"
                            checked={invitationSelected === "invite"}
                            onChange={() => setinvitationSelected("invite")}
                            className="cursor-pointer size-7"
                        />
                        <label
                            htmlFor="invite"
                            className={`text-2xl font-normal cursor-pointer transition ${
                                invitationSelected === "invite" ? "text-primary" : "text-white"
                            }`}
                        >
                        Invite-only
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-[30px] font-normal text-primary'>STAKES / LIMITS</h4>
                <div>
                    <div className='flex items-center gap-3'>
                        <input type="radio" id="fixed" name="limits" className='size-7 cursor-pointer' />
                        <label htmlFor='fixed' className='text-2xl font-normal text-white cursor-pointer'>Fixed Limit</label>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type="radio" id="pot" name="limits" className='size-7 cursor-pointer' />
                        <label htmlFor='pot' className='text-2xl font-normal text-white cursor-pointer'>Pot Limit</label>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type="radio" id="no" name="limits" className='size-7 cursor-pointer' />
                        <label htmlFor='no' className='text-2xl font-normal text-white cursor-pointer'>No Limit</label>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                        <input type="radio" id="custom" name="limits" className='size-7 cursor-pointer' />
                        <label htmlFor='custom' className='text-2xl font-normal text-white cursor-pointer'>Custom blinds</label>
                        <div className='w-2/5 border border-white rounded-md grid grid-cols-2'>
                            <div className='flex items-center justify-center px-1'>
                                <p className='text-2xl font-extralight text-white'>$</p>
                                <Input type="number" className="w-fit max-w-2/3 text-left border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={2} />
                            </div>
                            <div className='flex items-center justify-center border-l border-white'>
                                <p className='text-2xl font-extralight text-white'>$</p>
                                <Input type="number" className="w-fit max-w-2/3 text-left border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={9} />
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-5'>BUY-IN SETTINGS</h4>
                <div className='w-full border border-white rounded-md grid grid-cols-2'>
                    <div className='flex items-center justify-between px-2'>
                        <p className='text-2xl font-extralight text-white'>min</p>
                        <Input type="number" className="w-1/3 text-right border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={2} />
                    </div>
                    <div className='flex items-center justify-between border-l border-white px-3'>
                        <p className='text-2xl font-extralight text-white'>max</p>
                        <Input type="number" className="w-1/3 text-right border-none outline-none text-2xl font-normal text-white bg-transparent remove-arrows p-0" defaultValue={9} />
                    </div>
                </div>
                <div className='flex w-full items-center gap-3 mt-1'>
                    <p className='text-2xl font-noraml text-white'>Rebuy</p>
                    <Toggler/>
                    <p className='text-2xl font-noraml text-white pl-16'>Add-on</p>
                    <Toggler/>
                </div>
            </div>
            
            <div>
                <h4 className='text-[30px] font-normal text-primary'>TURN TIMER</h4>
                <div className='flex items-center gap-3'>
                    <Input type="number" defaultValue={10} className={"border border-white w-1/4 text-center text-2xl font-normal text-white rounded-md bg-transparent p-0"} />
                    <p className='text-2xl font-normal text-white'>sec</p>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-6'>ANTES / STRADDLES</h4>
                <div className='flex w-full items-center gap-3 mt-1'>
                    <p className='text-2xl font-noraml text-white'>Antes</p>
                    <Toggler/>
                    <p className='text-2xl font-noraml text-white pl-4'>Straddles</p>
                    <Toggler/>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-5'>BUY-IN RE-ENTRY RULES</h4>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="allowed"
                            name="re-entry"
                            value="allowed"
                            checked={invitationSelected === "allowed"}
                            onChange={() => setReEntrySelected("allowed")}
                            className="cursor-pointer size-7"
                        />
                        <label
                            htmlFor="allowed"
                            className={`text-2xl font-normal cursor-pointer transition ${
                                reEntrySelected === "allowed" ? "text-primary" : "text-white"
                            }`}
                        >
                            Allowed
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            id="buy-in"
                            name="re-entry"
                            value="buy-in"
                            checked={reEntrySelected === "buy-in"}
                            onChange={() => setReEntrySelected("buy-in")}
                            className="cursor-pointer size-7"
                        />
                        <label
                            htmlFor="invite"
                            className={`text-2xl font-normal cursor-pointer transition ${
                                reEntrySelected === "buy-in" ? "text-primary" : "text-white"
                            }`}
                        >
                            One buy-in only
                        </label>
                    </div>
                </div>
                <h4 className='text-[30px] font-normal text-primary mt-5'>FAIR PLAY / ETIQUETTE</h4>
                <div className='flex items-center gap-3'>
                    <input type="checkbox" id="agree" name="agree" className='size-7 cursor-pointer' />
                    <label htmlFor='agree' className='text-2xl font-normal text-white cursor-pointer'>I agree with fair play rules</label>
                </div>
            </div>
        </div>
    )
}
