import type { NextPage } from "next";
import { Page } from "../components/Page";
import Link from "next/link";
import { PoweredByPoolTogether } from "../components/PoweredByPoolTogether";

const Home: NextPage = () => {
  return (
    <Page
      title="PoolTogether Delegation Donation"
      description="Delegate your chances to win to another wallet while maintaining full custody of your funds."
    >
      <div className="flex flex-col gap-8">
        <Hero />
        <Explainer />
      </div>
    </Page>
  );
};

const Hero = () => {
  return (
    <div className="relative">
      <div className="mask mask-heart absolute inset-1/4 w-1/2 h-1/2 bg-secondary" />
      <div className="hero py-10 bg-base-200 bg-opacity-50 rounded-xl backdrop-blur-3xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Make an impact, risk free</h1>
            <p className="py-6">
              Delegate your chances to win prizes to charities and causes you
              care about while maintaining full custody of your funds.
            </p>
            <Link href="/explore" className="">
              <button className="btn btn-primary mb-4">Get Started</button>
            </Link>
            <PoweredByPoolTogether />
          </div>
        </div>
      </div>
    </div>
  );
};

const Explainer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full card bg-base-300">
        <div className="card-body ">
          <ul className="steps steps-vertical text-lg md:h-96">
            <li className="step step-secondary text-left">
              Deposit the Prize Pool of your choice on PoolTogether, the
              Ethereum worlds best prize savings account.
            </li>
            <li className="step step-secondary text-left">
              Direct your chances to win to a charity or cause you care about by
              delegating to them on this website.
            </li>
            <li className="step step-secondary text-left">
              Wait for them to win prizes! Anyone can claim the prizes on their
              behalf to ensure they receive their winnings.
            </li>
          </ul>
        </div>
      </div>
      <div className="mockup-window border border-base-200 bg-base-300 w-full h-96 md:h-auto">
        <iframe
          className="flex w-full h-full"
          src="https://pooltogether.com"
          title="PoolTogether"
        />
      </div>
    </div>
  );
};

export default Home;
