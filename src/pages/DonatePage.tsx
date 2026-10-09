import React, { useState } from 'react';
import { DataStore } from '../services/store';
import {
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  Package,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  CreditCard,
  Building2,
  Sparkles,
  Info,
  DollarSign,
  Coins,
  Globe2,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { formatWhatsAppUrl } from '../utils';

interface DonatePageProps {
  onNavigate: (path: string) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ onNavigate }) => {
  const content = DataStore.getSiteContent();
  const [pledgeType, setPledgeType] = useState<'material' | 'financial'>('material');
  const [materialFulfillmentMode, setMaterialFulfillmentMode] = useState<'physical' | 'payment'>('payment');
  
  // Currency and freeform amount controls
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedSwift, setCopiedSwift] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    materialItems: [] as string[],
    estimatedQuantity: '',
    paymentReference: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Bank accounts for Naira (NGN) and US Dollar (USD)
  const bankAccounts = {
    NGN: {
      currencyLabel: 'Nigerian Naira (₦ NGN)',
      currencySymbol: '₦',
      bankName: 'Guaranty Trust Bank (GTBank)',
      accountName: 'AOS Foundation Educational Relief',
      accountNumber: '0124893710',
      accountType: 'Corporate NGN Account',
      referenceCode: 'AOS-NGN-SUPPORT',
      quickSuggestions: ['5,000', '10,000', '25,000', '50,000', '100,000', '250,000', '500,000'],
    },
    USD: {
      currencyLabel: 'United States Dollar ($ USD)',
      currencySymbol: '$',
      bankName: 'Guaranty Trust Bank (GTBank) Domiciliary',
      accountName: 'AOS Foundation Educational Relief (USD Domiciliary)',
      accountNumber: '0124893727',
      swiftCode: 'GTBINGLA',
      sortCode: '058152062',
      accountType: 'Domiciliary Foreign Currency Account',
      referenceCode: 'AOS-USD-SUPPORT',
      quickSuggestions: ['25', '50', '100', '250', '500', '1,000', '2,500'],
    },
  };

  const activeBank = bankAccounts[currency];

  const materialsAvailable = [
    'Exercise Notebooks',
    'School Bags (Backpacks)',
    'Durable School Shoes',
    'Tailored School Uniforms',
    'Socks & Undergarments',
    'Stationery & Mathematical Sets',
  ];

  const toggleMaterial = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      materialItems: prev.materialItems.includes(item)
        ? prev.materialItems.filter((i) => i !== item)
        : [...prev.materialItems, item],
    }));
  };

  const copyToClipboard = (text: string, type: 'account' | 'swift' | 'ref') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'account') {
        setCopiedAccount(true);
        setTimeout(() => setCopiedAccount(false), 2500);
      } else if (type === 'swift') {
        setCopiedSwift(true);
        setTimeout(() => setCopiedSwift(false), 2500);
      } else {
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2500);
      }
    }
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate('/get-involved');
    }
  };

  const formattedAmountDisplay = customAmount.trim()
    ? `${activeBank.currencySymbol}${customAmount} ${currency}`
    : `Any amount in ${currency}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    let messageDetails = '';
    if (pledgeType === 'material') {
      if (materialFulfillmentMode === 'payment') {
        messageDetails = `MATERIAL DONATION (FAST PAYMENT OPTION): Sponsor-Specified Amount: [${formattedAmountDisplay}]. Currency: [${currency}]. Payment Ref/Narration: [${formData.paymentReference || activeBank.referenceCode}]. Note: ${formData.message}`;
      } else {
        messageDetails = `MATERIAL PLEDGE (PHYSICAL ITEMS): Items: [${formData.materialItems.join(', ')}]. Est. Qty: [${formData.estimatedQuantity || 'Not specified'}]. Note: ${formData.message}`;
      }
    } else {
      messageDetails = `FINANCIAL SPONSORSHIP PLEDGE: Sponsor-Specified Amount: [${formattedAmountDisplay}]. Currency: [${currency}]. Payment Ref: [${formData.paymentReference || activeBank.referenceCode}]. Note: ${formData.message}`;
    }

    DataStore.submitEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organisation: formData.organisation || 'Individual Donor',
      enquiryType: 'Donation',
      message: messageDetails,
    });

    setSubmitted(true);
  };

  const whatsappDirectPledge = formatWhatsAppUrl(
    '08168779732',
    `Hello AOS Foundation, I wish to support your work with a donation of ${formattedAmountDisplay}. Please provide official coordination details.`
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation & Breadcrumbs Bar */}
      <div className="border-b border-[#E6DDD5] bg-[#FAF3EE]/80 sticky top-16 z-30 backdrop-blur-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer shadow-2xs"
              title="Navigate back to former stage or section"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← Back to Former Section</span>
            </button>
            <span className="text-xs text-[#737373] hidden sm:inline">
              (Get Involved)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => onNavigate('/')}
              className="text-[#737373] hover:text-[#B05A28] hidden sm:inline transition-colors"
            >
              Home
            </button>
            <span className="text-[#A39B94] hidden sm:inline">/</span>
            <button
              onClick={() => onNavigate('/get-involved')}
              className="text-[#737373] hover:text-[#B05A28] hidden sm:inline transition-colors"
            >
              Support Pathways
            </button>
            <span className="text-[#A39B94] hidden sm:inline">/</span>
            <span className="font-bold text-[#8F431E]">Material Donation & Payments</span>

            <button
              type="button"
              onClick={() => onNavigate('/volunteer')}
              className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-[#E6DDD5] text-xs font-semibold text-[#525252] hover:text-[#111111] hover:border-[#B05A28]/40 transition-colors"
              title="Navigate to next section: Volunteer Registry"
            >
              <span>Next: Volunteer</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B05A28]" />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-14 sm:py-18">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            <Package className="w-3.5 h-3.5" />
            <span>Educational Materials & Pupil Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Support Essential School Materials
          </h1>
          <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Every contribution directly provides a child with notebooks, backpacks, tailored uniforms, and sturdy shoes. Choose to deliver physical items or enter any custom contribution amount in Naira or US Dollars.
          </p>
        </div>
      </section>

      {/* Official Security & Transparency Protocol Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-xl bg-[#FAF3EE] border border-[#E6DDD5] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B05A28] shrink-0 mt-0.5" />
          <div className="text-xs text-[#8F431E] leading-relaxed">
            <span className="font-bold">Official Donor Security Protocol:</span> AOS Foundation maintains transparent, auditable banking channels in both Nigerian Naira (NGN) and US Dollars (USD). You will receive an official acknowledgment, digital receipt, and photographic distribution tracking report.
          </div>
        </div>
      </section>

      {/* Main Donation Interaction Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-2xl border border-[#E6DDD5] shadow-xs overflow-hidden">
          {/* Tab Selector: Material Support vs Financial Sponsorship */}
          <div className="grid grid-cols-2 border-b border-[#E6DDD5] bg-[#FCFAF7]">
            <button
              type="button"
              onClick={() => {
                setPledgeType('material');
                setSubmitted(false);
              }}
              className={`py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                pledgeType === 'material'
                  ? 'bg-white text-[#B05A28] border-b-2 border-[#B05A28]'
                  : 'text-[#525252] hover:text-[#111111]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Material Donation Enquiry</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setPledgeType('financial');
                setSubmitted(false);
              }}
              className={`py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                pledgeType === 'financial'
                  ? 'bg-white text-[#B05A28] border-b-2 border-[#B05A28]'
                  : 'text-[#525252] hover:text-[#111111]'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Kit Sponsorship Enquiry</span>
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">
                  Pledge & Payment Enquiry Received
                </h3>
                <p className="text-sm text-[#525252] leading-relaxed">
                  Thank you for standing with our pupils. We have recorded your contribution of{' '}
                  <span className="font-bold text-[#B05A28]">{formattedAmountDisplay}</span>. A dedicated AOS Foundation coordinator will reach out within 24 hours with delivery logistics, receipt acknowledgment, or transfer reconciliation.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={whatsappDirectPledge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCustomAmount('');
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        organisation: '',
                        materialItems: [],
                        estimatedQuantity: '',
                        paymentReference: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-md bg-[#FCFAF7] hover:bg-[#F3EAE2] text-[#111111] text-xs font-semibold border border-[#E6DDD5] cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>

                <div className="pt-6 border-t border-[#E6DDD5] flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleBackNavigation}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#8F431E] hover:text-[#B05A28] group cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return to Former Section</span>
                  </button>
                  <span className="text-[#E6DDD5]">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="text-xs text-[#737373] hover:text-[#111111]"
                  >
                    Go to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Back Link inside form for fast reassurance */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DDD5]">
                  <button
                    type="button"
                    onClick={handleBackNavigation}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8F431E] hover:text-[#B05A28] transition-colors group cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Former Section / Stage</span>
                  </button>
                  <span className="text-[11px] text-[#737373]">
                    Support Our Work · Step 1 of 1
                  </span>
                </div>

                {pledgeType === 'material' && (
                  /* Material Donation Mode Selector: Physical Delivery vs Direct Payment */
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF3EE] to-white border border-[#E6DDD5] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                          <Sparkles className="w-3.5 h-3.5 text-[#B05A28]" />
                          <span>Material Donation Options</span>
                        </div>
                        <p className="text-xs text-[#525252] mt-0.5">
                          Deliver physical goods yourself or make a direct payment so our field team procures them without any stress.
                        </p>
                      </div>

                      {/* Fast Mode Toggle Buttons */}
                      <div className="inline-flex p-1 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] shrink-0">
                        <button
                          type="button"
                          onClick={() => setMaterialFulfillmentMode('payment')}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            materialFulfillmentMode === 'payment'
                              ? 'bg-[#B05A28] text-white shadow-2xs'
                              : 'text-[#8F431E] hover:text-[#111111]'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Payment Option</span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full">
                            Zero Stress
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setMaterialFulfillmentMode('physical')}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                            materialFulfillmentMode === 'physical'
                              ? 'bg-[#B05A28] text-white shadow-2xs'
                              : 'text-[#525252] hover:text-[#111111]'
                          }`}
                        >
                          📦 Physical Items
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SHOW PAYMENT & AMOUNT FORM IF (pledgeType === 'financial' OR materialFulfillmentMode === 'payment') */}
                {(pledgeType === 'financial' || (pledgeType === 'material' && materialFulfillmentMode === 'payment')) ? (
                  <div className="space-y-6 animate-in fade-in-50 duration-200">
                    {/* Currency Option Selector (Naira and Dollar) */}
                    <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                            1. Select Payment Currency Option:
                          </label>
                          <p className="text-xs text-[#525252] mt-0.5">
                            Sponsors can contribute freely in either Nigerian Naira (₦) or US Dollars ($).
                          </p>
                        </div>

                        {/* Naira / Dollar Buttons */}
                        <div className="inline-flex p-1 rounded-xl bg-white border border-[#E6DDD5] shrink-0">
                          <button
                            type="button"
                            onClick={() => setCurrency('NGN')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              currency === 'NGN'
                                ? 'bg-[#B05A28] text-white shadow-xs'
                                : 'text-[#404040] hover:text-[#111111]'
                            }`}
                          >
                            <Coins className="w-4 h-4" />
                            <span>🇳🇬 Naira (₦ NGN)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrency('USD')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                              currency === 'USD'
                                ? 'bg-[#B05A28] text-white shadow-xs'
                                : 'text-[#404040] hover:text-[#111111]'
                            }`}
                          >
                            <DollarSign className="w-4 h-4" />
                            <span>🇺🇸 US Dollar ($ USD)</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Freeform Amount Input - Sponsors Decide Their Own Contribution */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                          2. Enter Your Contribution Amount ({currency}):
                        </label>
                        <span className="text-xs text-[#737373]">
                          No forced tiers — sponsors enter any amount
                        </span>
                      </div>

                      {/* Custom Input Field with Currency Prefix */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-lg font-bold text-[#B05A28]">
                            {activeBank.currencySymbol}
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder={
                            currency === 'NGN'
                              ? 'Enter any amount (e.g. 25,000 or 150,000)'
                              : 'Enter any amount (e.g. 50 or 500)'
                          }
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full pl-10 pr-24 py-3.5 rounded-xl border-2 border-[#E6DDD5] focus:border-[#B05A28] focus:ring-2 focus:ring-[#B05A28]/20 text-base font-bold text-[#111111] bg-white transition-all outline-hidden"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-xs font-mono font-bold text-[#8F431E] bg-[#FAF3EE] px-2 py-1 rounded">
                            {currency}
                          </span>
                        </div>
                      </div>

                      {/* Quick Suggestion Chips (Purely optional shortcuts for sponsor ease) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-[#737373] block">
                          Optional quick suggestions (click to auto-fill or enter your own custom amount above):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeBank.quickSuggestions.map((suggestion) => (
                            <button
                              type="button"
                              key={suggestion}
                              onClick={() => setCustomAmount(suggestion)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                customAmount === suggestion
                                  ? 'bg-[#B05A28] text-white border-[#B05A28] shadow-2xs'
                                  : 'bg-white border-[#E6DDD5] text-[#262626] hover:bg-[#FAF3EE] hover:border-[#B05A28]/40'
                              }`}
                            >
                              <span>{activeBank.currencySymbol}{suggestion}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Official Verified Banking Details Card (Adapts to NGN or USD) */}
                    <div className="p-5 rounded-2xl bg-white border-2 border-[#E6DDD5] shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6DDD5]">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-5 h-5 text-[#B05A28]" />
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E] block">
                              Official {currency} Banking Channel
                            </span>
                            <span className="text-xs text-[#737373]">
                              {activeBank.accountType}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                          ✓ Verified Institutional Account
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] space-y-1">
                          <span className="text-[#737373] block text-[11px]">Bank Name</span>
                          <span className="font-bold text-[#111111] block text-sm">
                            {activeBank.bankName}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] space-y-1">
                          <span className="text-[#737373] block text-[11px]">Account Name</span>
                          <span className="font-bold text-[#111111] block text-sm">
                            {activeBank.accountName}
                          </span>
                        </div>

                        {/* Account Number with Copy Button */}
                        <div className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-[#737373] block text-[11px]">
                              {currency === 'NGN' ? 'NUBAN Account Number' : 'USD Domiciliary Account'}
                            </span>
                            <span className="font-mono font-bold text-[#B05A28] block text-base tracking-wider">
                              {activeBank.accountNumber}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeBank.accountNumber, 'account')}
                            className="px-3 py-1.5 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            {copiedAccount ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Swift Code for USD, or Reference Narration for NGN */}
                        {currency === 'USD' ? (
                          <div className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="text-[#737373] block text-[11px]">SWIFT / BIC Code</span>
                              <span className="font-mono font-bold text-[#111111] block text-sm">
                                {bankAccounts.USD.swiftCode}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankAccounts.USD.swiftCode, 'swift')}
                              className="px-3 py-1.5 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              {copiedSwift ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] flex items-center justify-between">
                            <div className="space-y-1">
                              <span className="text-[#737373] block text-[11px]">Payment Reference / Narration</span>
                              <span className="font-mono font-bold text-[#111111] block text-xs">
                                {activeBank.referenceCode}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(activeBank.referenceCode, 'ref')}
                              className="px-3 py-1.5 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              {copiedRef ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {currency === 'USD' && (
                        <div className="p-3 rounded-lg bg-[#FAF3EE] border border-[#E6DDD5] flex items-start gap-2.5 text-xs text-[#8F431E]">
                          <Globe2 className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">International Wire & Online Sponsoring:</span> Foreign corporate sponsors or overseas donors may also coordinate via direct wire invoices or international payment cards. Contact our coordination desk directly via WhatsApp (08168779732).
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Bank Transfer Reference or Transaction ID (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. GTB/TRF/98124 or Wire Reference Number"
                        value={formData.paymentReference}
                        onChange={(e) =>
                          setFormData({ ...formData, paymentReference: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                      />
                    </div>
                  </div>
                ) : (
                  /* PHYSICAL GOODS PROVISION FORM */
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#8F431E] mb-2">
                        Select Physical Materials You Wish to Supply:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {materialsAvailable.map((item) => {
                          const isChecked = formData.materialItems.includes(item);
                          return (
                            <button
                              type="button"
                              key={item}
                              onClick={() => toggleMaterial(item)}
                              className={`p-3 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                                isChecked
                                  ? 'bg-[#FAF3EE] border-[#B05A28] text-[#8F431E]'
                                  : 'bg-white border-[#E6DDD5] text-[#262626] hover:bg-[#FCFAF7]'
                              }`}
                            >
                              <span>{item}</span>
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isChecked
                                    ? 'bg-[#B05A28] border-[#B05A28] text-white'
                                    : 'border-[#E6DDD5]'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Estimated Quantities or Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 100 notebooks, 30 school bags, 50 pairs of shoes"
                        value={formData.estimatedQuantity}
                        onChange={(e) =>
                          setFormData({ ...formData, estimatedQuantity: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                      />
                    </div>
                  </div>
                )}

                {/* Donor Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E6DDD5]">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="080... or +1..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Organisation / Foundation (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Company, church, or community group"
                      value={formData.organisation}
                      onChange={(e) =>
                        setFormData({ ...formData, organisation: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Additional Message or Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific community location preference, questions, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Donation Enquiry
                  </button>

                  <a
                    href={whatsappDirectPledge}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#8F431E] hover:text-[#B05A28]"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] fill-current" />
                    <span>Coordinate Directly on WhatsApp (08168779732)</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Prominent Bottom Cross-Section Navigation Pathway */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-6 bg-white rounded-xl border border-[#E6DDD5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Navigation Arrow: Back to Former Stage / Section</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/volunteer')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Next Section: Volunteer Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
